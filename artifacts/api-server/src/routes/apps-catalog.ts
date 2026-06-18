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

// POST /api/apps-catalog/upload-image — sube imágenes al storage de Supabase
router.post('/apps-catalog/upload-image', async (req, res) => {
  const { base64, mime, filename, type } = req.body as { base64?: string; mime?: string; filename?: string; type?: 'icon' | 'guide' };
  if (!base64 || !mime || !filename) return res.status(400).json({ error: 'base64, mime y filename son requeridos' });

  const SUPABASE_URL = process.env.SUPABASE_URL ?? '';
  const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';
  const BUCKET = type === 'guide' ? 'guide-images' : 'app-icons';

  const ext = filename.split('.').pop()?.toLowerCase() ?? 'jpg';
  const safeName = `${BUCKET.replace('-', '_')}_${Date.now()}.${ext}`;

  try {
    const storageH: Record<string, string> = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` };
    // ensure bucket exists (idempotent)
    await fetch(`${SUPABASE_URL}/storage/v1/bucket`, {
      method: 'POST', headers: { ...storageH, 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: BUCKET, name: BUCKET, public: true }),
    });
    const buf = Buffer.from(base64, 'base64');
    const uploadRes = await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET}/${safeName}`, {
      method: 'POST', headers: { ...storageH, 'Content-Type': mime, 'Cache-Control': '3600' }, body: buf,
    });
    if (!uploadRes.ok) {
      const errText = await uploadRes.text();
      req.log?.warn({ status: uploadRes.status, errText }, 'apps-catalog image upload failed');
      return res.status(uploadRes.status).json({ error: errText });
    }
    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${safeName}`;
    return res.json({ url: publicUrl });
  } catch (e: unknown) {
    req.log?.error({ err: e }, 'apps-catalog upload-image error');
    return res.status(500).json({ error: e instanceof Error ? e.message : 'error' });
  }
});

export default router;
