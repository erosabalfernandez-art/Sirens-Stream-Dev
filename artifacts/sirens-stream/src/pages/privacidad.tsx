import { SEOHead } from "@/components/layout/SEOHead";

  export default function Privacidad() {
    return (
      <>
        <SEOHead path="/privacidad" />
        <div className="min-h-screen bg-[#07070f] text-white">
          <div className="max-w-3xl mx-auto px-5 py-20">
            <h1 className="text-3xl font-extrabold text-white mb-2">Política de Privacidad</h1>
            <p className="text-white/40 text-sm mb-10">Última actualización: 20 de junio de 2026</p>

            <Section title="1. Quiénes somos">
              <P>Eclipse Angels Agency es una agencia de streaming y chat hostess con sede operativa en Latinoamérica. Nuestra web es <a href="https://eclipse-angels.onrender.com" className="text-purple-400 underline">eclipse-angels.onrender.com</a> y puedes contactarnos en <a href="mailto:eclipse_angels@outlook.com" className="text-purple-400 underline">eclipse_angels@outlook.com</a>.</P>
            </Section>

            <Section title="2. Qué datos recopilamos">
              <P>Recopilamos únicamente los datos que tú nos proporcionas voluntariamente al:</P>
              <ul className="list-disc list-inside text-white/60 text-sm leading-relaxed space-y-1 mt-2">
                <li>Registrarte como usuaria en nuestra plataforma (nombre, correo electrónico, contraseña cifrada).</li>
                <li>Completar tu perfil de streamer (nombre artístico, información de contacto, datos de pago).</li>
                <li>Enviarnos mensajes a través del formulario de contacto o WhatsApp.</li>
              </ul>
              <P className="mt-3">También recopilamos automáticamente datos técnicos básicos como tu dirección IP (para detectar el país y ofrecerte contenido adecuado), tipo de navegador y páginas visitadas dentro de nuestro sitio.</P>
            </Section>

            <Section title="3. Para qué usamos tus datos">
              <ul className="list-disc list-inside text-white/60 text-sm leading-relaxed space-y-1">
                <li>Gestionar tu cuenta y acceso a la plataforma.</li>
                <li>Calcular y mostrarte tus ingresos y nómina.</li>
                <li>Enviarte notificaciones importantes sobre tu cuenta o pagos.</li>
                <li>Detectar tu país de origen para mostrarte el contenido correcto según las leyes locales.</li>
                <li>Mejorar el funcionamiento del sitio.</li>
              </ul>
              <P className="mt-3">No usamos tus datos para publicidad de terceros ni los vendemos jamás.</P>
            </Section>

            <Section title="4. Con quién compartimos tus datos">
              <P>Tus datos solo se comparten con:</P>
              <ul className="list-disc list-inside text-white/60 text-sm leading-relaxed space-y-1 mt-2">
                <li><strong className="text-white/80">Supabase:</strong> proveedor de base de datos segura en la nube donde se almacena tu información de cuenta.</li>
                <li><strong className="text-white/80">Las plataformas de streaming</strong> (Waha, Layla, Howdy) solo en la medida necesaria para gestionar tu cuenta de streamer.</li>
              </ul>
              <P className="mt-3">Nunca vendemos, alquilamos ni cedemos tus datos personales a terceros.</P>
            </Section>

            <Section title="5. Cuánto tiempo guardamos tus datos">
              <P>Guardamos tus datos mientras tu cuenta esté activa. Si solicitas la eliminación de tu cuenta, borramos todos tus datos personales en un plazo máximo de 30 días, salvo que la ley nos obligue a conservarlos más tiempo.</P>
            </Section>

            <Section title="6. Tus derechos">
              <P>Tienes derecho a:</P>
              <ul className="list-disc list-inside text-white/60 text-sm leading-relaxed space-y-1 mt-2">
                <li>Acceder a tus datos personales.</li>
                <li>Corregir datos incorrectos.</li>
                <li>Solicitar la eliminación de tu cuenta y datos.</li>
                <li>Oponerte al tratamiento de tus datos.</li>
              </ul>
              <P className="mt-3">Para ejercer cualquiera de estos derechos, escríbenos a <a href="mailto:eclipse_angels@outlook.com" className="text-purple-400 underline">eclipse_angels@outlook.com</a>.</P>
            </Section>

            <Section title="7. Seguridad">
              <P>Usamos conexiones cifradas (HTTPS), contraseñas hasheadas y proveedores de confianza para proteger tus datos. Sin embargo, ningún sistema es 100% seguro. Si detectas algún problema de seguridad, notifícanos de inmediato.</P>
            </Section>

            <Section title="8. Cookies">
              <P>Usamos cookies técnicas esenciales para mantener tu sesión iniciada. No usamos cookies de seguimiento ni publicidad. Puedes configurar tu navegador para rechazar cookies, aunque esto puede afectar el funcionamiento de tu cuenta.</P>
            </Section>

            <Section title="9. Cambios en esta política">
              <P>Podemos actualizar esta política cuando sea necesario. Te notificaremos de cambios importantes dentro de la plataforma. La fecha en la parte superior indica la versión vigente.</P>
            </Section>

            <Section title="10. Contacto">
              <P>Si tienes preguntas sobre esta política, escríbenos a <a href="mailto:eclipse_angels@outlook.com" className="text-purple-400 underline">eclipse_angels@outlook.com</a>.</P>
            </Section>
          </div>
        </div>
      </>
    );
  }

  function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <section className="mb-10">
        <h2 className="text-lg font-bold text-white/90 mb-3 border-b border-white/8 pb-2">{title}</h2>
        {children}
      </section>
    );
  }

  function P({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return <p className={`text-white/60 text-sm leading-relaxed ${className}`}>{children}</p>;
  }
  