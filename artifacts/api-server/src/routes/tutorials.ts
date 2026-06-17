import { Router } from "express";

const router = Router();

function sbH(): Record<string, string> {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';
  return { apikey: key, Authorization: `Bearer ${key}` };
}
function sbUrl(p: string) {
  return `${process.env.SUPABASE_URL}/rest/v1/${p}`;
}

const FALLBACK_TUTORIALS = [
  { id: 1, title: "Cómo configurar tu primer stream en Waha", description: "Aprende paso a paso cómo configurar tu perfil, ajustar tu foto y empezar a generar diamantes desde el primer día.", category: "setup", duration: "20 min", level: "beginner", imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80", videoUrl: null, tags: ["Waha", "configuración", "principiantes"] },
  { id: 2, title: "Estrategias para maximizar diamantes", description: "Descubre las mejores estrategias para aumentar tus diamantes: horarios pico, interacción VIP y bonos.", category: "monetization", duration: "30 min", level: "intermediate", imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80", videoUrl: null, tags: ["diamantes", "ganancias", "estrategia"] },
  { id: 3, title: "Cómo usar Layla y acumular monedas", description: "Técnicas para aprovechar el sistema de monedas acumulables de Layla y alcanzar el retiro mínimo de $10 USD.", category: "growth", duration: "25 min", level: "beginner", imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80", videoUrl: null, tags: ["Layla", "monedas", "retiro"] },
];

router.get("/tutorials", async (_req, res) => {
  try {
    const r = await fetch(sbUrl('tutorials?select=*&order=sort_order.asc,id.asc'), { headers: sbH() });
    if (r.ok) {
      const rows: unknown[] = await r.json();
      if (rows.length > 0) {
        res.set("Cache-Control", "public, max-age=3600, stale-while-revalidate=86400");
        return res.json(rows);
      }
    }
  } catch {}
  res.set("Cache-Control", "public, max-age=3600, stale-while-revalidate=86400");
  return res.json(FALLBACK_TUTORIALS);
});

router.get("/tutorials/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const r = await fetch(sbUrl(`tutorials?id=eq.${encodeURIComponent(id)}&select=*`), { headers: sbH() });
    if (r.ok) {
      const rows: unknown[] = await r.json();
      if (rows.length > 0) {
        res.set("Cache-Control", "public, max-age=3600, stale-while-revalidate=86400");
        return res.json(rows[0]);
      }
    }
  } catch {}
  const numId = Number(id);
  if (!Number.isInteger(numId) || numId <= 0) {
    return res.status(400).json({ error: "Invalid id" });
  }
  const tutorial = FALLBACK_TUTORIALS.find((t) => t.id === numId);
  if (!tutorial) return res.status(404).json({ error: "Tutorial not found" });
  res.set("Cache-Control", "public, max-age=3600, stale-while-revalidate=86400");
  return res.json(tutorial);
});

export default router;