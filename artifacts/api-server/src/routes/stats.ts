import { Router } from "express";

  const router = Router();

  function sbH() {
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';
    return { apikey: key, Authorization: `Bearer ${key}` };
  }

  router.get("/stats", async (_req, res) => {
    res.set("Cache-Control", "public, max-age=3600, stale-while-revalidate=86400");

    let platforms: string[] = ["Waha", "Layla", "Howdy"];
    try {
      const r = await fetch(
        `${process.env.SUPABASE_URL}/rest/v1/apps_catalog?is_active=eq.true&select=name&order=sort_order.asc`,
        { headers: sbH() }
      );
      if (r.ok) {
        const rows: { name: string }[] = await r.json();
        if (rows.length > 0) platforms = rows.map(row => row.name);
      }
    } catch { /* fallback to hardcoded */ }

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
  