import { Router } from 'express'

  const router = Router()

  const SB  = process.env.SUPABASE_URL ?? ''
  const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''

  function h(): Record<string, string> {
    return { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' }
  }

  /**
   * GET /api/admin/pagos-salaries?apps=Waha,Layla,Howdy[&after_ts=<unix_ms>]
   * Returns published_salaries + admin_paid_marks + colider_marks for each app.
   * When after_ts is provided, only returns salaries created AFTER that timestamp
   * (used to exclude pre-cierre data). Falls back to latest-semana logic when absent.
   */
  router.get('/admin/pagos-salaries', async (req, res) => {
    const appsParam = (req.query.apps as string | undefined) ?? 'Waha,Layla,Howdy'
    const apps = appsParam.split(',').map(a => a.trim()).filter(Boolean)
    if (apps.length === 0) { res.json({ appSemanas: [], salaries: [], adminPaidUids: [], coliderPaidUids: [] }); return }

    const afterTsMs = parseInt((req.query.after_ts as string | undefined) ?? '0') || 0
    const afterIso = afterTsMs > 0 ? new Date(afterTsMs).toISOString() : null

    try {
      let allSalaries: any[] = []
      let appSemanas: { app: string; semana: string }[] = []

      if (afterIso) {
        // ── Timestamp-based mode: only rows published after the cierre ──────────
        const batches = await Promise.all(
          apps.map(app =>
            fetch(
              `${SB}/rest/v1/published_salaries?app_name=eq.${encodeURIComponent(app)}&created_at=gt.${encodeURIComponent(afterIso)}&usd=gt.0&select=*`,
              { headers: h() }
            ).then(r => r.ok ? r.json() : [])
              .then((rows: any[]) => rows.map((r: any) => ({ ...r, _app: app, _semana: r.semana })))
          )
        )
        allSalaries = batches.flat()
        // Build appSemanas from returned data (latest semana per app among results)
        const appSemanaMap: Record<string, string> = {}
        for (const row of allSalaries) {
          const app = row._app as string
          const sem = (row.semana as string) || ''
          if (!appSemanaMap[app] || sem > appSemanaMap[app]) appSemanaMap[app] = sem
        }
        appSemanas = Object.entries(appSemanaMap).map(([app, semana]) => ({ app, semana }))
      } else {
        // ── Legacy mode: latest semana per app ───────────────────────────────────
        const semanaResults = await Promise.all(
          apps.map(app =>
            fetch(`${SB}/rest/v1/published_salaries?app_name=eq.${encodeURIComponent(app)}&select=semana&order=semana.desc&limit=1`, { headers: h() })
              .then(r => r.ok ? r.json() : [])
              .then((rows: any[]) => ({ app, semana: rows[0]?.semana ?? null }))
          )
        )
        const allAppSemanas = semanaResults.filter(x => x.semana !== null && x.semana !== '') as { app: string; semana: string }[]
        if (allAppSemanas.length === 0) { res.json({ appSemanas: [], salaries: [], adminPaidUids: [], coliderPaidUids: [] }); return }

        // Only include apps whose latest semana matches the global most recent
        const mostRecentSemana = allAppSemanas.map(x => x.semana).sort().reverse()[0]
        appSemanas = allAppSemanas.filter(x => x.semana === mostRecentSemana)

        const salaryBatches = await Promise.all(
          appSemanas.map(({ app, semana }) =>
            fetch(`${SB}/rest/v1/published_salaries?app_name=eq.${encodeURIComponent(app)}&semana=eq.${encodeURIComponent(semana)}&usd=gt.0&select=*`, { headers: h() })
              .then(r => r.ok ? r.json() : [])
              .then((rows: any[]) => rows.map((r: any) => ({ ...r, _app: app, _semana: semana })))
          )
        )
        allSalaries = salaryBatches.flat()
      }

      if (allSalaries.length === 0) { res.json({ appSemanas, salaries: [], adminPaidUids: [], coliderPaidUids: [] }); return }

      const semanas = [...new Set(appSemanas.map(x => x.semana).filter(Boolean))]

      const [marksBatches, coliderRes] = await Promise.all([
        Promise.all(
          appSemanas.map(({ app, semana }) =>
            fetch(`${SB}/rest/v1/admin_paid_marks?app_name=eq.${encodeURIComponent(app)}&semana=eq.${encodeURIComponent(semana)}&select=uid`, { headers: h() })
              .then(r => r.ok ? r.json() : [])
              .then((rows: any[]) => rows.map((r: any) => r.uid as string))
          )
        ),
        semanas.length > 0
          ? fetch(
              `${SB}/rest/v1/colider_marks?person_type=eq.worker&semana=in.(${semanas.map(s => `"${s}"`).join(',')})&select=person_uid,person_app,paid`,
              { headers: h() }
            ).then(r => r.ok ? r.json() : [])
          : Promise.resolve([]),
      ])

      const adminPaidUids: string[] = marksBatches.flat().filter(Boolean)
      const coliderPaidUids: string[] = (coliderRes as any[])
        .filter((m: any) => m.paid === true)
        .map((m: any) => m.person_uid as string)

      res.json({ appSemanas, salaries: allSalaries, adminPaidUids, coliderPaidUids })
    } catch (e: unknown) {
      res.status(500).json({ error: e instanceof Error ? e.message : String(e) })
    }
  })

  /**
   * GET /api/admin/pagos-salaries/single?app=Waha
   * Returns latest published_salaries + admin_paid_marks + colider_marks for a single app
   * using service role (bypasses RLS completely).
   */
  router.get('/admin/pagos-salaries/single', async (req, res) => {
    const app = (req.query.app as string | undefined)?.trim()
    if (!app) { res.status(400).json({ error: 'app requerido' }); return }

    try {
      const semRes = await fetch(`${SB}/rest/v1/published_salaries?app_name=eq.${encodeURIComponent(app)}&select=semana&order=semana.desc&limit=1`, { headers: h() })
      if (!semRes.ok) { res.status(semRes.status).json({ error: await semRes.text() }); return }
      const semRows = await semRes.json() as { semana: string }[]
      if (!semRows[0]) { res.json({ semana: null, salaries: [], adminPaidUids: [], coliderPaidUids: [] }); return }
      const semana = semRows[0].semana

      const [salRes, marksRes, coliderRes] = await Promise.all([
        fetch(`${SB}/rest/v1/published_salaries?app_name=eq.${encodeURIComponent(app)}&semana=eq.${encodeURIComponent(semana)}&usd=gt.0&select=*`, { headers: h() }),
        fetch(`${SB}/rest/v1/admin_paid_marks?app_name=eq.${encodeURIComponent(app)}&semana=eq.${encodeURIComponent(semana)}&select=uid`, { headers: h() }),
        fetch(`${SB}/rest/v1/colider_marks?person_type=eq.worker&person_app=eq.${encodeURIComponent(app)}&semana=eq.${encodeURIComponent(semana)}&select=person_uid,paid`, { headers: h() }),
      ])

      if (!salRes.ok) { res.status(salRes.status).json({ error: await salRes.text() }); return }
      const salaries = await salRes.json() as any[]
      const adminPaidUids: string[] = marksRes.ok
        ? (await marksRes.json() as { uid: string }[]).map(m => m.uid)
        : []
      const coliderPaidUids: string[] = coliderRes.ok
        ? (await coliderRes.json() as { person_uid: string; paid: boolean }[])
            .filter(m => m.paid === true)
            .map(m => m.person_uid)
        : []

      res.json({ semana, salaries, adminPaidUids, coliderPaidUids })
    } catch (e: unknown) {
      res.status(500).json({ error: e instanceof Error ? e.message : String(e) })
    }
  })

  /**
   * GET /api/admin/agent-colider-marks?semana=20260601-20260607&agent_uids=uid1,uid2
   */
  router.get('/admin/agent-colider-marks', async (req, res) => {
    const semana = (req.query.semana as string | undefined)?.trim()
    const agentUidsParam = (req.query.agent_uids as string | undefined) ?? ''
    const agentUids = agentUidsParam.split(',').map(s => s.trim()).filter(Boolean)
    if (!semana || agentUids.length === 0) { res.json({ coliderMap: {}, adminPaidIds: [] }); return }

    try {
      const uidList = agentUids.map(u => `"${u}"`).join(',')
      const [agColRes, agWorkerRes, agAdminRes] = await Promise.all([
        fetch(`${SB}/rest/v1/colider_marks?person_type=eq.agent&semana=eq.${encodeURIComponent(semana)}&person_uid=in.(${uidList})&select=person_uid,paid`, { headers: h() })
          .then(r => r.ok ? r.json() : []),
        fetch(`${SB}/rest/v1/colider_marks?person_type=eq.worker&semana=eq.${encodeURIComponent(semana)}&person_uid=in.(${uidList})&select=person_uid,paid`, { headers: h() })
          .then(r => r.ok ? r.json() : []),
        fetch(`${SB}/rest/v1/admin_paid_marks?semana=eq.${encodeURIComponent(semana)}&uid=in.(${agentUids.map(u => `"agent_${u}"`).join(',')})&select=uid`, { headers: h() })
          .then(r => r.ok ? r.json() : []),
      ])
      const coliderMap: Record<string, boolean> = {}
      for (const m of agWorkerRes as any[]) coliderMap[(m as any).person_uid] = (m as any).paid
      for (const m of agColRes as any[]) coliderMap[(m as any).person_uid] = (m as any).paid
      const adminPaidIds: string[] = (agAdminRes as any[]).map((a: any) => String(a.uid).replace('agent_', ''))
      res.json({ coliderMap, adminPaidIds })
    } catch (e: unknown) {
      res.status(500).json({ error: e instanceof Error ? e.message : String(e) })
    }
  })

  export default router
