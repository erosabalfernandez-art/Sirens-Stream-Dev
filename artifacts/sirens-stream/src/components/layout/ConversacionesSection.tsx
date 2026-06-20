import { useState } from "react";
import { MessageCircle, Star, X, ChevronLeft, ChevronRight } from "lucide-react";

interface Conversacion {
  src: string;
  alt: string;
}

const conversaciones: Conversacion[] = [
  // Las capturas van aquí — se agregarán cuando el usuario las envíe
];

function Lightbox({ items, index, onClose }: { items: Conversacion[]; index: number; onClose: () => void }) {
  const [current, setCurrent] = useState(index);
  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length);
  const next = () => setCurrent((c) => (c + 1) % items.length);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
      >
        <X className="w-5 h-5 text-white" />
      </button>

      {/* Prev */}
      {items.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
      )}

      {/* Image */}
      <div className="px-16 max-h-screen flex items-center" onClick={(e) => e.stopPropagation()}>
        <img
          src={items[current].src}
          alt={items[current].alt}
          className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-2xl object-contain"
        />
      </div>

      {/* Next */}
      {items.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      )}

      {/* Counter */}
      {items.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
              className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-pink-400 w-4" : "bg-white/30"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function ConversacionesSection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (conversaciones.length === 0) return null;

  return (
    <>
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
              <button
                key={i}
                onClick={() => setLightboxIndex(i)}
                className="rounded-2xl overflow-hidden border border-white/10 bg-[#0d0d1e] hover:border-pink-500/40 transition-all group text-left cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={c.src}
                    alt={c.alt}
                    className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  {/* Hover overlay with zoom hint */}
                  <div className="absolute inset-0 bg-pink-500/0 group-hover:bg-pink-500/5 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 rounded-full px-3 py-1.5 text-xs text-white font-semibold tracking-wide">
                      Ver completa
                    </div>
                  </div>
                  {/* Gradient bottom fade */}
                  <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#0d0d1e] to-transparent" />
                </div>
                <div className="px-4 pb-4 pt-2 flex items-center gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-3 h-3 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          items={conversaciones}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
