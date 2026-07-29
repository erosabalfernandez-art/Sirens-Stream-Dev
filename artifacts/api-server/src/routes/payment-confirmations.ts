import { Router } from 'express'

const SB  = process.env.SUPABASE_URL ?? ''
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''

function h(extra: Record<string, string> = {}) {
  return { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json', ...extra }
}

const router = Router()

// GET /api/payment-confirmations?salary_ids=id1,id2,id3
// Returns confirmed salary_ids using service role (bypasses RLS so admin can read all workers' confirmations).
//
// Logic:
// 1. Direct match by salary_id (fast path).
// 2. For any salary that still appears unconfirmed, look up its user_id + app_name + semana from
//    published_salaries, then check whether that user has a confirmation for that app AND the same semana.
//    This handles re-uploaded nóminas: the admin can re-upload a nómina with new salary IDs
//    without doing a cierre, generating new salary IDs. Workers who confirmed the previous
//    salary_id are still counted as confirmed — because until cierre all uploads are the same week.
//    IMPORTANT: semana must also match so that confirmations from previous weeks do NOT bleed
//    into a new week after cierre.
router.get('/payment-confirmations', async (req, res) => {
  const { salary_ids } = req.query as { salary_ids?: string }
  if (!salary_ids) { res.status(400).json({ error: 'salary_ids requerido' }); return }
  const ids = salary_ids.split(',').map(s => s.trim()).filter(Boolean)
  if (ids.length === 0) { res.json({ confirmations: [] }); return }
  try {
    const filter = ids.map(id => `"${id}"`).join(',')

    // --- Step 1: direct match by salary_id ---
    const directR = await fetch(
      `${SB}/rest/v1/payment_confirmations?salary_id=in.(${filter})&select=salary_id,confirmed_at`,
      { headers: h() }
    )
    if (!directR.ok) { res.status(directR.status).json({ error: await directR.text() }); return }
    const directConfs = await directR.json() as { salary_id: string; confirmed_at: string }[]
    const directConfirmedIds = new Set(directConfs.map(c => c.salary_id))

    // If all are confirmed, return early
    const unconfirmedIds = ids.filter(id => !directConfirmedIds.has(id))
    if (unconfirmedIds.length === 0) { res.json({ confirmations: directConfs }); return }

    // --- Step 2: fallback — check by user_id + app_name + semana ---
    // A worker who confirmed any salary for the same app AND same semana is counted as confirmed,
    // because the admin may have re-uploaded the nómina without closing the week (new salary IDs).
    // We MUST include semana so that confirmations from a previous cierre don't show up here.
    const salaryFilter = unconfirmedIds.map(id => `"${id}"`).join(',')
    const salariesR = await fetch(
      `${SB}/rest/v1/published_salaries?id=in.(${salaryFilter})&select=id,user_id,app_name,semana`,
      { headers: h() }
    )
    if (!salariesR.ok) { res.json({ confirmations: directConfs }); return }
    const salaries = await salariesR.json() as { id: string; user_id: string | null; app_name: string; semana: string }[]

    const withUser = salaries.filter(s => s.user_id)
    if (withUser.length === 0) { res.json({ confirmations: directConfs }); return }

    const userIds = [...new Set(withUser.map(s => s.user_id as string))]
    const userFilter = userIds.map(id => `"${id}"`).join(',')

    // Collect unique semanas to filter confirmations
    const semanas = [...new Set(withUser.map(s => s.semana).filter(Boolean))]
    const semanaFilter = semanas.map(s => `"${s}"`).join(',')

    const userConfsR = await fetch(
      `${SB}/rest/v1/payment_confirmations?user_id=in.(${userFilter})&semana=in.(${semanaFilter})&select=salary_id,user_id,app_name,semana,confirmed_at`,
      { headers: h() }
    )
    if (!userConfsR.ok) { res.json({ confirmations: directConfs }); return }
    const userConfs = await userConfsR.json() as { salary_id: string; user_id: string; app_name: string; semana: string; confirmed_at: string }[]

    // Map: "user_id::app_name::semana" → earliest confirmed_at
    // semana must match so confirmations from a previous week never bleed into the current one
    const confirmedUserApps = new Map<string, string>()
    for (const c of userConfs) {
      const key = `${c.user_id}::${c.app_name}::${c.semana}`
      if (!confirmedUserApps.has(key) || c.confirmed_at < confirmedUserApps.get(key)!) {
        confirmedUserApps.set(key, c.confirmed_at)
      }
    }

    // Build synthetic confirmations for unconfirmed salaries whose user already confirmed
    // that app for the exact same semana
    const extraConfs: { salary_id: string; confirmed_at: string }[] = []
    for (const salary of withUser) {
      const key = `${salary.user_id}::${salary.app_name}::${salary.semana}`
      if (confirmedUserApps.has(key)) {
        extraConfs.push({ salary_id: salary.id, confirmed_at: confirmedUserApps.get(key)! })
      }
    }

    res.json({ confirmations: [...directConfs, ...extraConfs] })
  } catch (e) { res.status(500).json({ error: String(e) }) }
})

export default router
