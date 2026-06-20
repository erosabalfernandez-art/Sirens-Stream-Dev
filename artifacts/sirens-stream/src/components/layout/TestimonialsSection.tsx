import { useState } from "react";
import { Play, Star, MapPin } from "lucide-react";

interface Testimonial {
  name: string;
  country: string;
  flag: string;
  videoSrc?: string;
  thumbSrc?: string;
  tag: string;
}

const testimonials: Testimonial[] = [
  { name: "Streamer 1", country: "Latinoamérica", flag: "🌟", videoSrc: "/videos/testimonio-1.mp4", tag: "Streamer activa" },
  { name: "Streamer 2", country: "Latinoamérica", flag: "🌟", videoSrc: "/videos/testimonio-2.mp4", tag: "Streamer activa" },
  { name: "Streamer 3", country: "Latinoamérica", flag: "🌟", videoSrc: "/videos/testimonio-3.mp4", tag: "Streamer activa" },
  { name: "Próximamente", country: "Latinoamérica", flag: "🌟", tag: "Streamer activa" },
  { name: "Próximamente", country: "Latinoamérica", flag: "🌟", tag: "Streamer activa" },
  { name: "Próximamente", country: "Latinoamérica", flag: "🌟", tag: "Streamer activa" },
];

function VideoCard({ t }: { t: Testimonial }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0d0d1e] hover:border-pink-500/30 transition-all group">
      {/* Video area */}
      <div className="relative bg-[#07070f] aspect-[9/16] w-full flex items-center justify-center overflow-hidden">
        {t.videoSrc && playing ? (
          <video
            src={t.videoSrc}
            controls
            autoPlay
            className="w-full h-full object-cover"
            style={{ aspectRatio: "9/16" }}
          />
        ) : (
          <>
            {t.thumbSrc ? (
              <img src={t.thumbSrc} alt={t.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-pink-900/20 to-purple-900/20">
                <div className="w-16 h-16 rounded-full border-2 border-white/10 bg-white/5 flex items-center justify-center">
                  <span className="text-3xl">{t.flag}</span>
                </div>
                <div className="text-center px-4">
                  <p className="text-white/30 text-xs uppercase tracking-widest">Video próximamente</p>
                </div>
              </div>
            )}
            {/* Play button overlay */}
            {t.videoSrc && (
              <button
                onClick={() => setPlaying(true)}
                className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-pink-500/90 flex items-center justify-center shadow-lg shadow-pink-500/40 group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                </div>
              </button>
            )}
          </>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <p className="font-bold text-white text-sm">{t.name}</p>
          <span className="text-xs bg-pink-500/15 text-pink-300 border border-pink-500/20 rounded-full px-2 py-0.5">{t.tag}</span>
        </div>
        <div className="flex items-center gap-1 text-white/40 text-xs">
          <MapPin className="w-3 h-3" />
          <span>{t.country}</span>
        </div>
        <div className="flex items-center gap-0.5 mt-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-[#07070f]">
      <div className="max-w-7xl mx-auto px-5">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-500/20 rounded-full px-4 py-1.5 mb-4">
            <Star className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-pink-400">Testimonios Reales</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            Sus historias, en sus propias palabras
          </h2>
          <p className="text-white/45 max-w-xl mx-auto text-sm leading-relaxed">
            Les pedimos a nuestras streamers que respondieran estas 5 preguntas sinceramente.
            Aquí están sus respuestas — sin guión, sin edición.
          </p>
        </div>

        {/* Main layout: questions image + videos */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 items-start">

          {/* Left: the questions image */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl overflow-hidden border border-pink-500/20 shadow-xl shadow-pink-500/5">
              <img
                src="/images/testimonio-preguntas.jpg"
                alt="Preguntas para las streamers"
                className="w-full h-auto object-cover"
              />
            </div>
            <p className="text-white/30 text-xs text-center leading-relaxed px-2">
              Le enviamos estas preguntas a nuestras streamers por WhatsApp.<br />
              Los videos son sus respuestas reales.
            </p>
          </div>

          {/* Right: video grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <VideoCard key={i} t={t} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
