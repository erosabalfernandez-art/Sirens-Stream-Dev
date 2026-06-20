import { MessageCircle, Star } from "lucide-react";

interface Conversacion {
  src: string;
  alt: string;
}

const conversaciones: Conversacion[] = [
  // Las capturas van aquí — se agregarán cuando el usuario las envíe
];

export function ConversacionesSection() {
  if (conversaciones.length === 0) return null;

  return (
    <section className="py-20 bg-[#07070f]">
      <div className="max-w-7xl mx-auto px-5">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-500/20 rounded-full px-4 py-1.5 mb-4">
            <MessageCircle className="w-3.5 h-3.5 text-pink-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-pink-400">Directo de WhatsApp</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            Conversaciones con Streamers
          </h2>
          <p className="text-white/45 max-w-xl mx-auto text-sm leading-relaxed">
            Chats reales con nuestras streamers — sus dudas, sus primeras semanas y sus resultados.
          </p>
        </div>

        {/* Grid de capturas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {conversaciones.map((c, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden border border-white/10 bg-[#0d0d1e] hover:border-pink-500/30 transition-all group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={c.src}
                  alt={c.alt}
                  className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
                {/* Subtle gradient at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0d0d1e] to-transparent" />
              </div>
              <div className="px-4 pb-4 pt-2 flex items-center gap-0.5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-3 h-3 text-amber-400 fill-amber-400" />
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
