import { Link } from "wouter";
  import { BookOpen, Clock, ArrowRight, TrendingUp, DollarSign, Smartphone, Shield, Users, Zap } from "lucide-react";
import { ShareButtons } from "@/components/layout/ShareButtons";

  const articles = [
    {
      id: "como-ganar-dinero-streamer-waha-layla-howdy",
      title: "Cómo ganar dinero siendo streamer en Waha, Layla y Howdy en 2026",
      summary: "Guía completa para empezar desde cero como streamer latina y generar ingresos reales en dólares desde casa.",
      readTime: "6 min",
      icon: DollarSign,
      color: "text-blue-400",
      content: [
        { h: "¿Qué es ser streamer en Waha, Layla o Howdy?", p: "Ser streamer en estas apps significa conectar con usuarios de todo el mundo a través de chat, audio y videollamadas opcionales. No necesitas experiencia, equipo especial ni inversión. Solo tu celular y conexión a internet." },
        { h: "¿Cuánto puedes ganar?", p: "Una streamer activa con 4-6 horas diarias gana entre $10 y $50 USD por día. Con constancia mensual eso se traduce en $300 a $1,500 USD o más. Las streamers top de Eclipse Angels superan los $2,000 USD mensuales." },
        { h: "¿Cómo funcionan los pagos?", p: "Los pagos son semanales. Cada app tiene su sistema de retiro: Waha y Howdy permiten retirar vía Binance, transferencias bancarias y billeteras digitales. Layla tiene sus propios métodos disponibles en Latinoamérica." },
        { h: "Primeros pasos para empezar", p: "1) Contáctanos por WhatsApp o formulario. 2) Te asignamos una tutora de Eclipse Angels. 3) Te ayudamos a crear tu cuenta en la app. 4) Recibes capacitación gratuita de 2-3 días. 5) Empiezas a trabajar con acompañamiento." },
        { h: "¿Por qué unirse a Eclipse Angels Agency?", p: "Con Eclipse Angels no estás sola. Tienes tutora asignada, grupo de soporte, seguimiento de metas y acceso a bonos exclusivos de agencia. Somos una agencia verificada con streamers activas en toda Latinoamérica." },
      ],
    },
    {
      id: "diferencias-waha-layla-howdy",
      title: "Diferencias entre Waha, Layla y Howdy: ¿cuál es mejor para ti?",
      summary: "Comparamos las tres principales apps de streaming para que elijas la que mejor se adapta a tu perfil y disponibilidad.",
      readTime: "5 min",
      icon: Smartphone,
      color: "text-purple-400",
      content: [
        { h: "Waha: la app más popular", p: "Waha es la plataforma con mayor base de usuarios activos. Ofrece chat, audio, videollamadas match y privadas. Es ideal para streamers que quieren construir una base de clientes sólida rápidamente. Los pagos son semanales y el soporte de agencia es excelente." },
        { h: "Layla: enfocada en relaciones", p: "Layla tiene un modelo más orientado a conexiones más profundas con usuarios. Suele tener usuarios con mayor poder adquisitivo. Es perfecta para streamers que prefieren conversaciones más personalizadas y quieren maximizar cada interacción." },
        { h: "Howdy: rápido crecimiento", p: "Howdy es la app de más reciente expansión en Latinoamérica. Tiene menos competencia que Waha, lo que significa más oportunidades para nuevas streamers de posicionarse rápido. Los bonos de nuevas usuarias son especialmente atractivos." },
        { h: "¿Cuál elegir?", p: "La respuesta ideal es trabajar en las tres. Eclipse Angels te ayuda a gestionar las tres apps al mismo tiempo para maximizar tus ingresos sin sentirte saturada. Muchas de nuestras streamers ganan más del doble trabajando en múltiples plataformas." },
      ],
    },
    {
      id: "errores-que-te-pueden-banear-waha",
      title: "5 errores que te pueden banear en Waha (y cómo evitarlos)",
      summary: "Conoce los errores más comunes que cometen las nuevas streamers y que pueden poner en riesgo su cuenta.",
      readTime: "4 min",
      icon: Shield,
      color: "text-red-400",
      content: [
        { h: "Error 1: No responder a tiempo", p: "Las apps penalizan las tasas de respuesta bajas. Si tardas más de 5 minutos en responder mensajes, baja tu puntuación y puedes perder bonos o visibilidad. Solución: activa notificaciones y mantén el app abierta en tus horas de trabajo." },
        { h: "Error 2: Contenido inapropiado", p: "Compartir contenido que viole los términos de las apps resulta en ban inmediato y permanente. Eclipse Angels te capacita sobre qué está permitido y qué no en cada plataforma antes de empezar." },
        { h: "Error 3: Usar múltiples cuentas", p: "Crear más de una cuenta en la misma app desde el mismo dispositivo es motivo de ban. Si quieres trabajar en varias apps, necesitas hacerlo de forma correcta. Nuestras tutoras te explican cómo hacerlo bien." },
        { h: "Error 4: Desconectarse sin avisar", p: "Desaparecer durante días sin actividad baja tu ranking y hace que el algoritmo te muestre menos a los usuarios. Es mejor tener horarios fijos aunque sean pocas horas al día." },
        { h: "Error 5: No aprovechar los bonos de meta", p: "Todas las apps tienen metas diarias y semanales con bonificaciones extra. Muchas streamers nuevas no las conocen y dejan dinero sobre la mesa. En Eclipse Angels te enseñamos a leerlas y cumplirlas." },
      ],
    },
    {
      id: "como-crear-agencia-streamers-desde-cero",
      title: "Cómo crear una agencia de streamers desde cero sin inversión",
      summary: "Descubre cómo convertirte en manager y construir un equipo de streamers que genere ingresos pasivos en dólares.",
      readTime: "5 min",
      icon: Users,
      color: "text-amber-400",
      content: [
        { h: "¿Qué es un manager de streamers?", p: "Un manager o agente gestiona un equipo de streamers: las registra en las apps, las capacita, les da seguimiento de metas y gana comisiones automáticas por su trabajo. Es un negocio digital escalable desde casa." },
        { h: "¿Cuánto gana un manager?", p: "Los managers de Eclipse Angels ganan entre 10% y 30% de comisión sobre las ganancias de cada streamer de su equipo. Con 5 streamers activas ganando $200 USD cada una, tú cobras $100–$300 USD semanales sin hacer streams tú mismo." },
        { h: "Pasos para crear tu agencia", p: "1) Regístrate en Eclipse Angels como agente. 2) Recibes formación completa de manager. 3) Empiezas a reclutar streamers (te damos materiales). 4) Las registras bajo tu agencia en las apps. 5) Recibes comisiones semanales automáticamente." },
        { h: "¿Se puede ser streamer y manager al mismo tiempo?", p: "Sí, de hecho es la combinación ideal. Muchos de nuestros mejores agentes empezaron como streamers, aprendieron el negocio desde adentro y después escalaron a manager. Así tienen dos fuentes de ingresos." },
        { h: "Sin inversión, sin riesgo", p: "No hay cuota de inscripción, no hay productos que comprar, no hay inventario. Tu única inversión es tiempo. Eclipse Angels te da todas las herramientas, materiales y soporte gratuitamente." },
      ],
    },
    {
      id: "consejos-para-ganar-mas-como-streamer",
      title: "7 consejos para ganar más como streamer latina en 2026",
      summary: "Tips probados por las streamers top de Eclipse Angels para aumentar tus ingresos semanales significativamente.",
      readTime: "4 min",
      icon: TrendingUp,
      color: "text-green-400",
      content: [
        { h: "1. Establece un horario fijo", p: "Las streamers con horario fijo ganan hasta 40% más que las que se conectan de forma irregular. Los usuarios aprenden cuándo estás disponible y te buscan. Mínimo 4 horas al día en el mismo bloque de tiempo." },
        { h: "2. Personaliza cada conversación", p: "No uses respuestas genéricas. Recuerda el nombre y detalles de tus usuarios frecuentes. Un usuario que siente conexión real paga más, te regala más monedas y vuelve." },
        { h: "3. Cumple las metas diarias sin falta", p: "Las apps dan bonos adicionales por completar metas de mensajes, tiempo activa o usuarios nuevos. Esto puede representar 20-40% extra sobre tus ganancias base." },
        { h: "4. Usa bien el perfil y la foto", p: "Una foto de perfil clara, amigable y atractiva (no necesariamente de tu cara) puede duplicar la cantidad de usuarios que te escriben. Tu bio también importa, ponla en el idioma de la app." },
        { h: "5. Responde en menos de 2 minutos", p: "La tasa de respuesta es un factor clave en el ranking de las apps. Responder rápido mejora tu visibilidad en el algoritmo y te trae más usuarios nuevos automáticamente." },
        { h: "6. Trabaja en múltiples apps", p: "Trabajar en Waha, Layla y Howdy al mismo tiempo no es difícil con organización. Eclipse Angels te enseña a gestionar las tres sin agotarte y así triplicar tus fuentes de ingreso." },
        { h: "7. Pide ayuda a tu tutora", p: "Tu tutora en Eclipse Angels conoce todos los trucos y estrategias. Si tienes una semana baja, consulta antes de rendirte. Un pequeño ajuste de estrategia puede cambiar completamente tus resultados." },
      ],
    },
  ];

  export default function Blog() {
    return (
      <div className="min-h-screen bg-[#07070f] text-white">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-b from-[#0d0d1a] to-[#07070f]">
          <div className="max-w-4xl mx-auto px-5 text-center">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6">
              <BookOpen className="w-3.5 h-3.5" /> Blog & Guías
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
              Guías para Streamers y Agentes
            </h1>
            <p className="text-white/50 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              Todo lo que necesitas saber sobre trabajar en Waha, Layla y Howdy. Consejos reales de streamers activas de Eclipse Angels Agency.
            </p>
          </div>
        </section>

        {/* Articles */}
        <section className="pb-20">
          <div className="max-w-4xl mx-auto px-5 space-y-24">
            {articles.map((article) => {
              const Icon = article.icon;
              return (
                <article key={article.id} id={article.id} className="scroll-mt-20">
                  {/* Article header */}
                  <div className="border-b border-white/10 pb-6 mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-white/5 rounded-xl">
                        <Icon className={"w-5 h-5 " + article.color} />
                      </div>
                      <span className="flex items-center gap-1.5 text-white/40 text-xs">
                        <Clock className="w-3.5 h-3.5" /> {article.readTime} de lectura
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-extrabold leading-tight mb-3">{article.title}</h2>
                    <p className="text-white/50 text-sm leading-relaxed">{article.summary}</p>
                  </div>

                  {/* Article body */}
                  <div className="space-y-6">
                    {article.content.map((section, i) => (
                      <div key={i} className="bg-white/3 border border-white/8 rounded-2xl p-6">
                        <h3 className="font-bold text-base mb-2 text-white/90">{section.h}</h3>
                        <p className="text-white/60 text-sm leading-relaxed">{section.p}</p>
                      </div>
                    ))}
                  </div>

                  {/* CTA after each article */}
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href="https://wa.me/5595984381686?text=Hola%2C%20quiero%20más%20información%20sobre%20Eclipse%20Angels%20Agency"
                      target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all"
                    >
                      Hablar con un asesor <ArrowRight className="w-4 h-4" />
                    </a>
                    <Link href="/ser-streamer" className="inline-flex items-center gap-2 bg-white/6 border border-white/12 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-white/10 transition-colors">
                      Quiero ser Streamer
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Table of contents / navigation */}
        <section className="py-12 bg-[#0d0d1a] border-t border-white/10">
          <div className="max-w-4xl mx-auto px-5">
            <h2 className="text-lg font-bold mb-6 text-white/70">Todos los artículos</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {articles.map((a) => {
                const Icon = a.icon;
                return (
                  <a key={a.id} href={"#" + a.id} className="flex items-start gap-3 bg-white/4 border border-white/10 rounded-xl p-4 hover:bg-white/6 transition-colors group">
                    <Icon className={"w-4 h-4 mt-0.5 shrink-0 " + a.color} />
                    <div>
                      <p className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors leading-snug">{a.title}</p>
                      <p className="text-xs text-white/40 mt-1">{a.readTime} de lectura</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* SEO text */}
        <section aria-hidden="true" className="px-6 pb-6 max-w-5xl mx-auto">
          <p className="text-[9px] text-white/15 leading-relaxed select-none">
            cómo ganar dinero como streamer · trabajar en Waha · trabajar en Layla · trabajar en Howdy · ser streamer latina · streamer desde casa · ganar dólares desde casa · agencia de streamers · crear agencia de streamers · manager de streamers · trabajo online sin inversión · empleo remoto para mujeres · cómo ser streamer · streamer Latinoamérica · Waha app · Howdy app · Layla app · diferencias Waha Layla Howdy · errores streamers · consejos para streamers · ganar más en Waha · Eclipse Angels Agency · blog streamer · guía streamer 2026
          </p>
        </section>
      </div>
    );
  }
  