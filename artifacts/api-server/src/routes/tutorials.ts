import { Router } from "express";

  const router = Router();

  const TUTORIALS_FALLBACK = [
    { id: 1, title: "Cómo configurar tu perfil en Waha", description: "Aprende paso a paso cómo configurar tu perfil en Waha para maximizar tus ganancias desde el primer día.", category: "setup", duration: "20 min", level: "beginner", imageUrl: "/images/waha-guide.png", videoUrl: null, tags: ["Waha", "perfil", "configuración", "principiantes"] },
    { id: 2, title: "Cómo registrarte en Layla con código de agencia", description: "Guía completa para registrarte en Layla e ingresar el código de agencia correctamente para poder monetizar.", category: "setup", duration: "15 min", level: "beginner", imageUrl: "/images/layla-guide.png", videoUrl: null, tags: ["Layla", "registro", "código de agencia"] },
    { id: 3, title: "Primeros pasos en Howdy", description: "Todo lo que necesitas saber para comenzar en Howdy: instalación, verificación y activación de tu cuenta.", category: "setup", duration: "25 min", level: "beginner", imageUrl: "/images/howdy-guide-1.jpg", videoUrl: null, tags: ["Howdy", "instalación", "verificación"] },
    { id: 4, title: "Cómo maximizar ganancias en salas de audio", description: "Estrategias para estar más tiempo visible en salas de audio y aumentar tus diamantes semanales.", category: "monetization", duration: "30 min", level: "intermediate", imageUrl: null, videoUrl: null, tags: ["salas de audio", "ganancias", "estrategia"] },
    { id: 5, title: "Métodos de pago: Binance y Pix", description: "Aprende a recibir tus pagos en Binance (USDT) o Pix y cómo configurar tu billetera correctamente.", category: "payments", duration: "20 min", level: "beginner", imageUrl: null, videoUrl: null, tags: ["Binance", "Pix", "pagos", "billetera"] },
    { id: 6, title: "Errores comunes y cómo evitarlos", description: "Los errores más frecuentes de las nuevas trabajadoras y cómo solucionarlos rápidamente.", category: "troubleshooting", duration: "25 min", level: "beginner", imageUrl: null, videoUrl: null, tags: ["errores", "soluciones", "FAQ"] }
  ];

  function sbH() {
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';
    return { apikey: key, Authorization: `Bearer ${key}` };
  }

  router.get("/tutorials", async (_req, res) => {
    res.set("Cache-Control", "public, max-age=3600, stale-while-revalidate=86400");
    try {
      const r = await fetch(
        `${process.env.SUPABASE_URL}/rest/v1/tutorials?is_active=eq.true&order=sort_order.asc,created_at.asc`,
        { headers: sbH() }
      );
      if (r.ok) {
        const data = await r.json() as unknown[];
        if (Array.isArray(data) && data.length > 0) {
          res.json(data);
          return;
        }
      }
    } catch { /* fallback */ }
    res.json(TUTORIALS_FALLBACK);
  });

  router.get("/tutorials/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const r = await fetch(
        `${process.env.SUPABASE_URL}/rest/v1/tutorials?id=eq.${encodeURIComponent(id)}&is_active=eq.true&limit=1`,
        { headers: sbH() }
      );
      if (r.ok) {
        const data = await r.json() as unknown[];
        if (Array.isArray(data) && data.length > 0) {
          res.json(data[0]);
          return;
        }
      }
    } catch { /* fallback to static */ }
    // Fallback: try numeric id from static list
    const numId = Number(id);
    const tutorial = TUTORIALS_FALLBACK.find((t: { id: number }) => t.id === numId);
    if (!tutorial) { res.status(404).json({ error: "Tutorial not found" }); return; }
    res.json(tutorial);
  });

  export default router;
  