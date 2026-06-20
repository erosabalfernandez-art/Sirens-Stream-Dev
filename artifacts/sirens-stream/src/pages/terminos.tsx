import { SEOHead } from "@/components/layout/SEOHead";

  export default function Terminos() {
    return (
      <>
        <SEOHead path="/terminos" />
        <div className="min-h-screen bg-[#07070f] text-white">
          <div className="max-w-3xl mx-auto px-5 py-20">
            <h1 className="text-3xl font-extrabold text-white mb-2">Términos y Condiciones de Uso</h1>
            <p className="text-white/40 text-sm mb-10">Última actualización: 20 de junio de 2026</p>

            <Section title="1. Aceptación de los términos">
              <P>Al acceder o usar los servicios de Eclipse Angels Agency ("la Agencia", "nosotros"), aceptas estos Términos y Condiciones en su totalidad. Si no estás de acuerdo, por favor no uses nuestros servicios.</P>
            </Section>

            <Section title="2. Descripción del servicio">
              <P>Eclipse Angels Agency es una agencia de gestión de streamers y chat hostess. Conectamos a mujeres latinoamericanas con plataformas internacionales de streaming (Waha, Layla, Howdy) para que puedan generar ingresos desde casa. La Agencia actúa como intermediaria y gestora, no como empleadora directa.</P>
            </Section>

            <Section title="3. Requisitos para ser streamer">
              <ul className="list-disc list-inside text-white/60 text-sm leading-relaxed space-y-1">
                <li>Tener al menos 18 años de edad.</li>
                <li>Contar con un smartphone con cámara y conexión estable a internet.</li>
                <li>Residir en un país de Latinoamérica donde las plataformas operen legalmente.</li>
                <li>No tener antecedentes de violaciones a las políticas de las plataformas asociadas.</li>
              </ul>
            </Section>

            <Section title="4. Compromisos de la streamer">
              <P>Al unirte como streamer, te comprometes a:</P>
              <ul className="list-disc list-inside text-white/60 text-sm leading-relaxed space-y-1 mt-2">
                <li>Cumplir con las políticas de contenido de cada plataforma (sin desnudez, sin contenido para adultos, sin conductas ilegales).</li>
                <li>Mantener un comportamiento profesional y respetuoso con los usuarios.</li>
                <li>Informar a la Agencia cualquier problema con tu cuenta o pagos.</li>
                <li>No compartir tus credenciales de acceso con terceros.</li>
                <li>Cumplir con las horas mínimas acordadas con tu manager.</li>
              </ul>
            </Section>

            <Section title="5. Pagos e ingresos">
              <P>Los ingresos provienen directamente de las plataformas de streaming. Eclipse Angels Agency gestiona el cobro y transfiere los pagos según el esquema acordado. Los pagos son semanales en dólares estadounidenses (USD) a través de los métodos disponibles en tu país.</P>
              <P className="mt-2">La Agencia retiene una comisión por sus servicios de gestión, capacitación y soporte, tal como se indica en tu acuerdo de incorporación.</P>
            </Section>

            <Section title="6. Restricciones geográficas">
              <P>Algunos servicios de la Agencia no están disponibles en todos los países. El acceso a determinadas secciones del sitio puede estar restringido según tu ubicación geográfica para cumplir con las leyes locales aplicables.</P>
            </Section>

            <Section title="7. Propiedad intelectual">
              <P>Todo el contenido de este sitio web (textos, imágenes, logotipos, diseño) es propiedad de Eclipse Angels Agency o se usa bajo licencia. Está prohibido copiar, reproducir o distribuir este contenido sin autorización expresa por escrito.</P>
            </Section>

            <Section title="8. Limitación de responsabilidad">
              <P>Eclipse Angels Agency no garantiza un nivel de ingresos específico, ya que este depende del desempeño individual de cada streamer y de las condiciones de las plataformas. La Agencia no se responsabiliza por cambios en las políticas o remuneración de las plataformas de terceros.</P>
            </Section>

            <Section title="9. Suspensión y terminación">
              <P>La Agencia se reserva el derecho de suspender o dar de baja la cuenta de cualquier streamer que viole estos términos, las políticas de las plataformas o que muestre conductas perjudiciales para la Agencia o la comunidad.</P>
            </Section>

            <Section title="10. Modificaciones">
              <P>Podemos actualizar estos términos en cualquier momento. Las actualizaciones importantes serán comunicadas dentro de la plataforma. El uso continuado del servicio tras los cambios implica la aceptación de los nuevos términos.</P>
            </Section>

            <Section title="11. Contacto">
              <P>¿Tienes preguntas sobre estos términos? Escríbenos a <a href="mailto:eclipse_angels@outlook.com" className="text-purple-400 underline">eclipse_angels@outlook.com</a>.</P>
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
  