import { Router } from 'express';

  const router = Router();

  const FALLBACK_APPS = [
    { id: 1, name: 'Waha', icon_url: null as string | null, is_active: true, sort_order: 1 },
    { id: 2, name: 'Layla', icon_url: null as string | null, is_active: true, sort_order: 2 },
    { id: 3, name: 'Howdy', icon_url: null as string | null, is_active: true, sort_order: 3 },
  ];
  const FALLBACK_NAMES = ['Waha', 'Layla', 'Howdy'];

  function sbH(): Record<string, string> {
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';
    return { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' };
  }
  function sbUrl(p: string) {
    return `${process.env.SUPABASE_URL}/rest/v1/${p}`;
  }

  // GET /api/apps-catalog?active_only=true
  router.get('/apps-catalog', async (req, res) => {
    const activeOnly = req.query.active_only !== 'false';
    try {
      const filter = activeOnly ? '&is_active=eq.true' : '';
      const r = await fetch(
        sbUrl(`apps_catalog?select=id,name,display_name,icon_url,is_active,sort_order,color_hex,color_hex_secondary,description_es,description_pt,earnings_info_es,earnings_info_pt,download_url_android,download_url_ios,telegram_channel_url,agency_code&order=sort_order.asc,name.asc${filter}`),
        { headers: sbH() }
      );
      if (!r.ok) return res.json({ apps: FALLBACK_APPS, fallback: true });
      const rows = await r.json() as Record<string, unknown>[];
      if (!Array.isArray(rows) || rows.length === 0) return res.json({ apps: FALLBACK_APPS, fallback: true });
      return res.json({ apps: rows, fallback: false });
    } catch {
      return res.json({ apps: FALLBACK_APPS, fallback: true });
    }
  });

  // GET /api/apps-catalog/names — returns only the names array
  router.get('/apps-catalog/names', async (_req, res) => {
    try {
      const r = await fetch(
        sbUrl('apps_catalog?select=name&is_active=eq.true&order=sort_order.asc,name.asc'),
        { headers: sbH() }
      );
      if (!r.ok) return res.json({ names: FALLBACK_NAMES });
      const rows = await r.json() as { name: string }[];
      if (!Array.isArray(rows) || rows.length === 0) return res.json({ names: FALLBACK_NAMES });
      return res.json({ names: rows.map(row => row.name) });
    } catch {
      return res.json({ names: FALLBACK_NAMES });
    }
  });

  // POST /api/apps-catalog — create a new app
  router.post('/apps-catalog', async (req, res) => {
    const { name, display_name, icon_url, is_active = true, sort_order = 0 } = req.body as {
      name?: string; display_name?: string; icon_url?: string; is_active?: boolean; sort_order?: number;
    };
    if (!name?.trim()) return res.status(400).json({ error: 'name requerido' });
    try {
      const r = await fetch(sbUrl('apps_catalog'), {
        method: 'POST',
        headers: { ...sbH(), Prefer: 'return=representation' },
        body: JSON.stringify({
          name: name.trim(),
          display_name: display_name?.trim() ?? name.trim(),
          icon_url: icon_url ?? null,
          is_active,
          sort_order,
        }),
      });
      if (!r.ok) return res.status(r.status).json({ error: await r.text() });
      const [row] = await r.json() as Record<string, unknown>[];
      return res.json({ ok: true, app: row });
    } catch (e: unknown) {
      return res.status(500).json({ error: String(e) });
    }
  });

  // PATCH /api/apps-catalog/:name — update an app (toggle is_active, etc.)
  router.patch('/apps-catalog/:name', async (req, res) => {
    const { name } = req.params;
    const updates = req.body as Record<string, unknown>;
    delete updates.id; delete updates.created_at;
    try {
      const r = await fetch(sbUrl(`apps_catalog?name=eq.${encodeURIComponent(name)}`), {
        method: 'PATCH',
        headers: { ...sbH(), Prefer: 'return=representation' },
        body: JSON.stringify(updates),
      });
      if (!r.ok) return res.status(r.status).json({ error: await r.text() });
      return res.json({ ok: true });
    } catch (e: unknown) {
      return res.status(500).json({ error: String(e) });
    }
  });

  // DELETE /api/apps-catalog/:name — remove an app
  router.delete('/apps-catalog/:name', async (req, res) => {
    const { name } = req.params;
    try {
      const r = await fetch(sbUrl(`apps_catalog?name=eq.${encodeURIComponent(name)}`), {
        method: 'DELETE',
        headers: sbH(),
      });
      if (!r.ok) return res.status(r.status).json({ error: await r.text() });
      return res.json({ ok: true });
    } catch (e: unknown) {
      return res.status(500).json({ error: String(e) });
    }
  });

  export default router;
  