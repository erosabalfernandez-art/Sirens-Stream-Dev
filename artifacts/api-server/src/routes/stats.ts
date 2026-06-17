import { Router } from "express";

const router = Router();

function sbH(): Record<string, string> {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';
  return { apikey: key, Authorization: `Bearer ${key}` };
}
function sbUrl(p: string) {
  return `${process.env.SUPABASE_URL}/rest/v1/${p}`;
}

router.get("/stats", async (_req, res) => {
  let platforms: string[] = ["Waha", "Layla", "Howdy"];
  try {
    const r = await fetch(sbUrl('apps_catalog?is_active=eq.true&select=name&order=sort_order.asc'), { headers: sbH() });
    if (r.ok) {
      const rows: { name: string }[] = await r.json();
      if (rows.length > 0) platforms = rows.map(r => r.name);
    }
  } catch {}
  res.set("Cache-Control", "public, max-age=300, stale-while-revalidate=3600");
  res.json({
    streamersRepresented: 500,
    totalFollowers: "250K",
    averageGrowthRate: "340%",
    successStories: 47,
    yearsActive: 3,
    platforms,
  });
});

export default router;
