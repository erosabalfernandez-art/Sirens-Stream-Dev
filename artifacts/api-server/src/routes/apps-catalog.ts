import { Router } from 'express';

const router = Router();

function sbH(): Record<string, string> {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';
  return { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' };
}
function sbUrl(p: string) {
  return `${process.env.SUPABASE_URL}/rest/v1/${p}`;
}

router.get('/apps-catalog', async (req, res) => {
  const adminMode = req.query.admin === 'true';
  const filter = adminMode ? '' : '&is_active=eq.true';
  try {
    const r = await fetch(sbUrl(`apps_catalog?select=*&order=sort_order.asc${filter}`), { headers: sbH() });
    if (!r.ok) return res.status(r.status).json({ error: await r.text() });
    return res.json({ apps: await r.json() });
  } catch (e: unknown) {
    return res.status(500).json({ error: e instanceof Error ? e.message : 'error' });
  }
});

router.post('/apps-catalog', async (req, res) => {
  const body = req.body as Record<string, unknown>;
  if (!body.name || !body.display_name) return res.status(400).json({ error: 'name y display_name son requeridos' });
  const name = String(body.name).trim();
  if (!/^[A-Za-z][A-Za-z0-9_-]{0,29}$/.test(name)) {
    return res.status(400).json({ error: 'name debe ser alfanumérico, sin espacios, máximo 30 caracteres' });
  }
  try {
    const r = await fetch(sbUrl('apps_catalog'), {
      method: 'POST',
      headers: { ...sbH(), Prefer: 'return=representation' },
      body: JSON.stringify({ ...body, name, updated_at: new Date().toISOString() }),
    });
    if (!r.ok) return res.status(r.status).json({ error: await r.text() });
    const [app] = await r.json();
    return res.status(201).json({ app });
  } catch (e: unknown) {
    return res.status(500).json({ error: e instanceof Error ? e.message : 'error' });
  }
});

router.patch('/apps-catalog/:name', async (req, res) => {
  const { name } = req.params;
  const body = req.body as Record<string, unknown>;
  delete body.name;
  try {
    const r = await fetch(sbUrl(`apps_catalog?name=eq.${encodeURIComponent(name)}`), {
      method: 'PATCH',
      headers: { ...sbH(), Prefer: 'return=representation' },
      body: JSON.stringify({ ...body, updated_at: new Date().toISOString() }),
    });
    if (!r.ok) return res.status(r.status).json({ error: await r.text() });
    const [app] = await r.json();
    return res.json({ app });
  } catch (e: unknown) {
    return res.status(500).json({ error: e instanceof Error ? e.message : 'error' });
  }
});

router.delete('/apps-catalog/:name', async (req, res) => {
  const { name } = req.params;
  if (['Waha', 'Layla', 'Howdy'].includes(name)) {
    return res.status(403).json({ error: 'Las apps originales no se pueden eliminar' });
  }
  try {
    const r = await fetch(sbUrl(`apps_catalog?name=eq.${encodeURIComponent(name)}`), {
      method: 'PATCH',
      headers: { ...sbH(), Prefer: 'return=minimal' },
      body: JSON.stringify({ is_active: false, updated_at: new Date().toISOString() }),
    });
    if (!r.ok) return res.status(r.status).json({ error: await r.text() });
    return res.json({ ok: true });
  } catch (e: unknown) {
    return res.status(500).json({ error: e instanceof Error ? e.message : 'error' });
  }
});

export default router;
