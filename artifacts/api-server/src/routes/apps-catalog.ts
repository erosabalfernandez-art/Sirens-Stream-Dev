import { Router } from 'express';

const router = Router();

const FALLBACK_APPS = ['Waha', 'Layla', 'Howdy'];

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
    const filter = activeOnly ? '&active=eq.true' : '';
    const r = await fetch(
      sbUrl(`apps_catalog?select=id,name,logo_url,active,order_index&order=order_index.asc,name.asc${filter}`),
      { headers: sbH() }
    );
    if (!r.ok) {
      // Table might not exist yet — return fallback
      return res.json({
        apps: FALLBACK_APPS.map((name, i) => ({ id: i + 1, name, logo_url: null, active: true, order_index: i })),
        fallback: true,
      });
    }
    const rows = await r.json() as { id: number; name: string; logo_url: string | null; active: boolean; order_index: number }[];
    if (!Array.isArray(rows) || rows.length === 0) {
      return res.json({
        apps: FALLBACK_APPS.map((name, i) => ({ id: i + 1, name, logo_url: null, active: true, order_index: i })),
        fallback: true,
      });
    }
    return res.json({ apps: rows, fallback: false });
  } catch (e: unknown) {
    return res.json({
      apps: FALLBACK_APPS.map((name, i) => ({ id: i + 1, name, logo_url: null, active: true, order_index: i })),
      fallback: true,
    });
  }
});

// GET /api/apps-catalog/names — returns only the names array (convenient shorthand)
router.get('/apps-catalog/names', async (_req, res) => {
  try {
    const r = await fetch(
      sbUrl(`apps_catalog?select=name&active=eq.true&order=order_index.asc,name.asc`),
      { headers: sbH() }
    );
    if (!r.ok) return res.json({ names: FALLBACK_APPS });
    const rows = await r.json() as { name: string }[];
    if (!Array.isArray(rows) || rows.length === 0) return res.json({ names: FALLBACK_APPS });
    return res.json({ names: rows.map(r => r.name) });
  } catch {
    return res.json({ names: FALLBACK_APPS });
  }
});

// POST /api/apps-catalog — create a new app
router.post('/apps-catalog', async (req, res) => {
  const { name, logo_url, active = true, order_index = 0 } = req.body as {
    name?: string; logo_url?: string; active?: boolean; order_index?: number;
  };
  if (!name?.trim()) return res.status(400).json({ error: 'name requerido' });
  try {
    const r = await fetch(sbUrl('apps_catalog'), {
      method: 'POST',
      headers: { ...sbH(), Prefer: 'return=representation' },
      body: JSON.stringify({ name: name.trim(), logo_url: logo_url ?? null, active, order_index }),
    });
    if (!r.ok) return res.status(r.status).json({ error: await r.text() });
    const [row] = await r.json() as any;
    return res.json({ ok: true, app: row });
  } catch (e: unknown) {
    return res.status(500).json({ error: e instanceof Error ? e.message : 'error' });
  }
});

// PATCH /api/apps-catalog/:id — update an app
router.patch('/apps-catalog/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ error: 'id inválido' });
  const { name, logo_url, active, order_index } = req.body as {
    name?: string; logo_url?: string | null; active?: boolean; order_index?: number;
  };
  const patch: Record<string, unknown> = {};
  if (name !== undefined) patch.name = name.trim();
  if (logo_url !== undefined) patch.logo_url = logo_url;
  if (active !== undefined) patch.active = active;
  if (order_index !== undefined) patch.order_index = order_index;
  if (Object.keys(patch).length === 0) return res.status(400).json({ error: 'Nada que actualizar' });
  try {
    const r = await fetch(sbUrl(`apps_catalog?id=eq.${id}`), {
      method: 'PATCH',
      headers: { ...sbH(), Prefer: 'return=representation' },
      body: JSON.stringify(patch),
    });
    if (!r.ok) return res.status(r.status).json({ error: await r.text() });
    const [row] = await r.json() as any;
    return res.json({ ok: true, app: row });
  } catch (e: unknown) {
    return res.status(500).json({ error: e instanceof Error ? e.message : 'error' });
  }
});

// DELETE /api/apps-catalog/:id
router.delete('/apps-catalog/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ error: 'id inválido' });
  try {
    const r = await fetch(sbUrl(`apps_catalog?id=eq.${id}`), {
      method: 'DELETE',
      headers: { ...sbH(), Prefer: 'return=minimal' },
    });
    if (!r.ok) return res.status(r.status).json({ error: await r.text() });
    return res.json({ ok: true });
  } catch (e: unknown) {
    return res.status(500).json({ error: e instanceof Error ? e.message : 'error' });
  }
});

export default router;
