// WizardVisualGuide — mini mockups del sitio real para cada paso del wizard
// Basado en las capturas de pantalla del sitio de producción

interface AppForm {
  display_name?: string | null; name?: string | null; ios_name?: string | null
  color_hex?: string | null; icon_url?: string | null; tagline?: string | null
  badge_label?: string | null; badge_color?: string | null
  description_es?: string | null; earnings_info_es?: string | null
  specs?: Array<{label: string; value: string}> | null; requisitos?: string[] | null
  agency_code?: string | null; download_url_android?: string | null
  download_url_ios?: string | null; guide_steps?: Array<{step: number; title: string; text: string; image_url?: string}> | null
  guide_whatsapp?: string | null; telegram_channel_url?: string | null
  sort_order?: number | null; is_active?: boolean | null
  payment_min_usd?: number | null; ai_knowledge_es?: string | null
  nomina_type?: string | null; commission_pct_default?: number | null
}

interface Props { step: number; form: AppForm }

export default function WizardVisualGuide({ step, form }: Props) {
  const name    = form.display_name || 'Tu App'
  const color   = form.color_hex   || '#9333ea'
  const initial = name[0]?.toUpperCase() || '?'
  const badge   = form.badge_label || 'Retiro semanal'
  const bc      = form.badge_color

  const Icon = ({ size = 36 }: { size?: number }) => (
    <div style={{ width: size, height: size, background: color, borderRadius: Math.round(size * 0.28), overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 900, color: 'white', fontSize: Math.round(size * 0.38) }}>
      {form.icon_url ? <img src={form.icon_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initial}
    </div>
  )

  const BadgePill = ({ label, active }: { label: string; active?: boolean }) => {
    const cls = bc === 'red' ? 'bg-red-500/20 text-red-300 border-red-500/40'
              : bc === 'green' ? 'bg-green-500/20 text-green-300 border-green-500/40'
              : bc === 'blue' ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
              : bc === 'yellow' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
              : 'bg-pink-500/20 text-pink-300 border-pink-500/40'
    return <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${cls} ${active ? 'ring-2 ring-yellow-400 ring-offset-1 ring-offset-[#07070f]' : ''}`}>{label}</span>
  }

  const PageTag = ({ label, icon }: { label: string; icon: string }) => (
    <div className="flex items-center gap-1 mb-2">
      <span className="text-[9px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 px-1.5 py-0.5 rounded-full">📍 {icon} {label}</span>
    </div>
  )

  const HL = 'ring-2 ring-yellow-400 ring-offset-1 ring-offset-[#0d0d1e] rounded-lg'
  const hlInline = { outline: '2px solid rgba(250,204,21,0.8)', outlineOffset: 2, borderRadius: 6 }

  // ── CARD CERRADA (base) ─────────────────────────────────────────────────────
  const ClosedCard = ({ hl }: { hl?: 'name' | 'badge' | 'icon' | 'tagline' | 'meta' }) => (
    <div className="bg-[#0d0d1e] border border-blue-500/15 rounded-xl p-3 flex items-start gap-2.5">
      <div style={hl === 'icon' ? hlInline : {}}><Icon size={36} /></div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
          <span className="text-white font-extrabold text-xs" style={hl === 'name' ? hlInline : {}}>{name}</span>
          <BadgePill label={badge} active={hl === 'badge'} />
          {form.payment_min_usd && (
            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 font-bold" style={hl === 'meta' ? hlInline : {}}>Meta mín. ${form.payment_min_usd} USD</span>
          )}
        </div>
        {form.tagline && <p className="text-white/45 text-[10px]" style={hl === 'tagline' ? hlInline : {}}>{form.tagline}</p>}
        <p className="text-white/20 text-[9px] mt-0.5 line-clamp-1">{form.description_es || 'Descripción de la app...'}</p>
      </div>
      <span className="text-white/20 text-xs">∨</span>
    </div>
  )

  // ── CARD EXPANDIDA (información general + requisitos) ───────────────────────
  const ExpandedCard = ({ hl }: { hl?: 'desc' | 'specs' | 'req' | 'earnings' | 'agency' | 'buttons' | 'guide' | 'download' }) => (
    <div className="bg-[#0d0d1e] border border-blue-500/30 rounded-xl overflow-hidden">
      <div className="p-3 flex items-start gap-2.5 border-b border-white/5">
        <Icon size={32} /><div className="flex-1"><div className="flex gap-1 flex-wrap"><span className="text-white font-extrabold text-xs">{name}</span><BadgePill label={badge} /></div><p className="text-white/40 text-[9px]">{form.tagline || 'Actividades de la app'}</p></div>
      </div>
      <div className="p-2.5 space-y-2">
        {/* Buttons */}
        <div className="flex gap-1.5 flex-wrap" style={hl === 'buttons' || hl === 'guide' || hl === 'download' ? hlInline : {}}>
          <span className="text-[9px] bg-[#1a1a3a] text-blue-300 border border-blue-500/30 px-1.5 py-0.5 rounded-lg font-bold" style={hl === 'guide' ? hlInline : {}}>📖 Guía</span>
          {form.telegram_channel_url && <span className="text-[9px] bg-[#1a1a3a] text-blue-300 border border-blue-500/30 px-1.5 py-0.5 rounded-lg font-bold">✈ Telegram</span>}
          <span className="text-[9px] bg-[#1a1a3a] text-white/50 border border-white/10 px-1.5 py-0.5 rounded-lg">💬 Tutora</span>
        </div>
        {/* Description */}
        {hl === 'desc' && <p className="text-white/60 text-[9px] leading-relaxed" style={hlInline}>{form.description_es || 'Descripción completa de la app...'}</p>}
        {/* INFORMACIÓN GENERAL */}
        {(hl === 'specs' || hl === undefined || hl === 'agency') && (
          <div style={hl === 'specs' ? hlInline : {}}>
            <p className="text-[8px] font-bold text-blue-400/80 mb-1 uppercase tracking-wider">Información General</p>
            <div className="grid grid-cols-3 gap-1">
              {(form.specs?.slice(0,6) ?? [
                {label:'Android', value: form.name || '—'},
                {label:'iOS', value: form.ios_name || '—'},
                {label:'Modo', value:'—'}
              ]).map((s,i) => (
                <div key={i} className="bg-[#07070f] border border-white/5 rounded px-1.5 py-1">
                  <p className="text-white/25 text-[8px]">{s.label}</p>
                  <p className="text-white/70 text-[9px] font-semibold truncate">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* REQUISITOS */}
        {(hl === 'req') && (
          <div style={hlInline}>
            <p className="text-[8px] font-bold text-blue-400/80 mb-1 uppercase tracking-wider">Requisitos Esenciales</p>
            <div className="flex flex-wrap gap-1">
              {(form.requisitos?.slice(0,3) ?? ['Mayor de edad','Buen WiFi','4-5 horas/día']).map((r,i) => (
                <span key={i} className="text-[8px] px-1.5 py-0.5 rounded-full bg-white/5 border border-white/8 text-white/50">✓ {r}</span>
              ))}
            </div>
          </div>
        )}
        {/* GANANCIAS */}
        {hl === 'earnings' && (
          <div style={hlInline}>
            <p className="text-[8px] font-bold text-blue-400/80 mb-1 uppercase tracking-wider">Ganancias por Actividad</p>
            <div className="bg-[#07070f] border border-white/5 rounded p-1.5">
              <pre className="text-white/50 text-[8px] whitespace-pre-wrap leading-relaxed">{form.earnings_info_es?.slice(0,120) || 'Actividad → X unidades\nMeta mínima: X = $Y USD\n...'}</pre>
            </div>
          </div>
        )}
        {/* AGENCY CODE */}
        {hl === 'agency' && form.agency_code && (
          <div style={hlInline}>
            <p className="text-[8px] font-bold text-blue-400/80 mb-1 uppercase tracking-wider">Código de Agencia</p>
            <div className="bg-blue-500/10 border border-blue-500/25 rounded px-2 py-1 text-center font-mono text-blue-300 font-extrabold text-xs">{form.agency_code}</div>
          </div>
        )}
        {/* DOWNLOAD BADGES */}
        {hl === 'download' && (
          <div className="flex gap-1 flex-wrap mt-1" style={hlInline}>
            {form.download_url_android && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-green-500/15 text-green-400 font-semibold border border-green-500/20">🤖 Android</span>}
            {form.download_url_ios && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 font-semibold border border-blue-500/20">🍎 iOS</span>}
          </div>
        )}
      </div>
    </div>
  )

  // ── GUIDE MODAL ──────────────────────────────────────────────────────────────
  const GuideModal = ({ hl }: { hl?: 'steps' | 'download' | 'title' }) => (
    <div className="bg-[#0d0d1e] border border-white/10 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between p-2.5 border-b border-white/5">
        <div className="flex items-center gap-1.5"><Icon size={20} /><span className="text-white/70 text-[10px] font-semibold">Guía — {name}</span></div>
        <span className="text-white/20 text-xs">✕</span>
      </div>
      <div className="p-2.5 space-y-1.5">
        <div className="text-center py-1.5" style={hl === 'title' ? hlInline : {}}>
          <p className="font-black text-sm" style={{ color }}>{name.toUpperCase()}</p>
          <p className="text-white/30 text-[8px] uppercase tracking-widest">Guía de Instalación Paso a Paso</p>
        </div>
        <div style={hl === 'steps' ? hlInline : {}}>
          {(form.guide_steps?.slice(0,3) ?? [
            {step:1, title:'Descarga la App', text:'Selecciona según tu dispositivo'},
            {step:2, title:'Instala la aplicación', text:'Desde el enlace descargado.'},
          ]).map(s => (
            <div key={s.step} className="bg-[#07070f] border border-white/5 rounded px-2 py-1.5 mb-1">
              <span className="text-[9px] font-bold" style={{ color }}>Paso {s.step} </span>
              <span className="text-[9px] font-bold text-white/70">{s.title}</span>
              <p className="text-white/40 text-[8px] mt-0.5">{s.text?.slice(0,50)}{s.text?.length > 50 ? '...' : ''}</p>
            </div>
          ))}
        </div>
        {hl === 'download' && (
          <div className="space-y-1 mt-1" style={hlInline}>
            {form.download_url_android && <div className="w-full text-center bg-[#1a1a3a] border border-green-500/20 rounded py-1 text-[9px] text-green-400 font-bold">🤖 Descargar Android</div>}
            {form.download_url_ios && <div className="w-full text-center bg-[#1a1a3a] border border-blue-500/20 rounded py-1 text-[9px] text-blue-400 font-bold">🍎 Descargar iOS</div>}
            {form.guide_whatsapp && <div className="w-full text-center bg-green-600/20 border border-green-500/30 rounded py-1 text-[9px] text-green-300 font-bold">💬 Enviar Captura + ID por WhatsApp</div>}
          </div>
        )}
      </div>
    </div>
  )

  // ── NÓMINA LIST ──────────────────────────────────────────────────────────────
  const NominaList = ({ hl }: { hl?: 'app' | 'metric' | 'commission' }) => (
    <div className="bg-[#0d0d1e] border border-white/8 rounded-xl overflow-hidden">
      <div className="px-3 py-2 border-b border-white/5"><p className="text-white font-bold text-xs">Nómina Semanal</p></div>
      <div className="divide-y divide-white/5">
        {[{name, color, active: true, note: form.nomina_type === 'manual' ? 'Entrada manual' : 'Upload Excel'},
          {name:'Layla', color:'#9333ea', active: false, note:'Entrada manual'},
          {name:'Howdy', color:'#ca8a04', active: false, note:'Sin nómina cargada'}
        ].map((app, i) => (
          <div key={i} className={`flex items-center gap-2 px-3 py-1.5 ${app.active && hl === 'app' ? '' : ''}`} style={app.active && hl === 'app' ? hlInline : {}}>
            <div style={{width:8, height:8, borderRadius:'50%', background: app.active ? '#22c55e' : '#4b5563'}} />
            <div style={{width:22, height:22, borderRadius:6, background:app.color, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, fontSize:9, color:'white', flexShrink:0}}>
              {app.name[0]}
            </div>
            <span className="text-white text-[10px] font-bold flex-1">{app.name}</span>
            {app.active && form.nomina_type === 'manual' && <span className="text-[9px] text-violet-300 bg-violet-500/15 border border-violet-500/20 px-1.5 py-0.5 rounded-full">Entrada manual</span>}
            {app.active && form.nomina_type !== 'manual' && <span className="text-white/25 text-[8px]">Upload Excel</span>}
            {!app.active && <span className="text-white/25 text-[8px]">{app.note}</span>}
            <span className="text-white/20 text-[9px]">∨</span>
          </div>
        ))}
      </div>
    </div>
  )

  // ── NÓMINA EXPANDED ──────────────────────────────────────────────────────────
  const NominaExpanded = ({ hl }: { hl?: 'commission' | 'cols' | 'manual' }) => (
    <div className="bg-[#0d0d1e] border border-white/8 rounded-xl overflow-hidden">
      <div className="px-3 py-2 flex items-center gap-2 border-b border-white/5" style={{ background: color + '22' }}>
        <div style={{width:8,height:8,borderRadius:'50%',background:'#22c55e'}} />
        <Icon size={22} />
        <span className="text-white font-extrabold text-xs">{name}</span>
      </div>
      <div className="px-3 py-2 space-y-1.5">
        <div className="flex items-center gap-2" style={hl === 'commission' ? hlInline : {}}>
          <span className="text-white/40 text-[9px] flex-1">% Comisión agentes:</span>
          <span className="text-white/70 text-[9px] font-bold">{form.commission_pct_default ?? 10}%</span>
        </div>
        {form.nomina_type === 'manual'
          ? <div className="bg-[#07070f] rounded p-2 space-y-1" style={hl === 'manual' ? hlInline : {}}>
              <p className="text-violet-300 text-[9px] font-bold">Entrada Manual</p>
              <div className="grid grid-cols-3 gap-1">
                {[{label:'Monedas retiro'}, {label:'Monedas comerc.'}, {label:'% Comisión'}].map((f,i) => (
                  <div key={i} className="bg-[#0d0d1e] border border-white/5 rounded px-1.5 py-1">
                    <p className="text-white/30 text-[8px]">{f.label}</p>
                    <div className="h-2 bg-white/5 rounded mt-1" />
                  </div>
                ))}
              </div>
            </div>
          : <div className="bg-[#07070f] rounded p-2" style={hl === 'cols' ? hlInline : {}}>
              <p className="text-white/30 text-[9px] mb-1">Columnas del Excel:</p>
              <div className="flex flex-wrap gap-1">
                <span className="text-[8px] bg-blue-500/10 text-blue-300 border border-blue-500/20 px-1.5 py-0.5 rounded">UID del Host</span>
                <span className="text-[8px] bg-blue-500/10 text-blue-300 border border-blue-500/20 px-1.5 py-0.5 rounded">USD</span>
                <span className="text-[8px] bg-blue-500/10 text-blue-300 border border-blue-500/20 px-1.5 py-0.5 rounded">Semana</span>
              </div>
            </div>
        }
      </div>
    </div>
  )

  // ── ANGELA CHAT ──────────────────────────────────────────────────────────────
  const AngelaChat = ({ hl }: { hl?: 'quickreply' | 'response' }) => (
    <div className="bg-[#0d0d1e] border border-violet-500/20 rounded-xl overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5" style={{ background: 'linear-gradient(90deg,#1a0a2e,#0d1a3a)' }}>
        <div className="w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center text-white text-[8px]">✦</div>
        <div><p className="text-white font-bold text-[9px]">Ángela — Eclipse Angels IA</p><p className="text-green-400 text-[8px]">● En línea ahora</p></div>
      </div>
      <div className="p-2 space-y-1.5">
        <div className="bg-[#1a1a2e] rounded-lg p-2 max-w-[85%]">
          <p className="text-white/70 text-[9px] leading-relaxed" style={hl === 'response' ? hlInline : {}}>¡Hola! Soy Ángela. Puedo ayudarte con información sobre {name} y todas nuestras apps.</p>
        </div>
        <div className="flex flex-wrap gap-1 pt-0.5" style={hl === 'quickreply' ? hlInline : {}}>
          <span className="text-[8px] px-1.5 py-0.5 rounded-full border border-white/15 text-white/50 bg-white/3">Info sobre {name}</span>
          <span className="text-[8px] px-1.5 py-0.5 rounded-full border border-white/15 text-white/50 bg-white/3">Info sobre Waha</span>
          <span className="text-[8px] px-1.5 py-0.5 rounded-full border border-white/15 text-white/50 bg-white/3">¿Cuánto puedo ganar?</span>
        </div>
        <div className="flex items-center gap-1 border border-white/8 rounded-lg px-2 py-1 bg-[#07070f]">
          <span className="text-white/20 text-[9px] flex-1">Escribe tu mensaje...</span>
          <span className="text-violet-400 text-[9px]">➤</span>
        </div>
      </div>
    </div>
  )

  // ── CANALES TABS ─────────────────────────────────────────────────────────────
  const CanalesTabs = ({ hl }: { hl?: 'tabs' | 'icon' }) => (
    <div className="bg-[#0d0d1e] border border-white/8 rounded-xl overflow-hidden">
      <div className="px-3 py-2 border-b border-white/5"><p className="text-white/60 text-[9px] font-bold uppercase tracking-wider">Panel de Admin — Canales</p></div>
      <div className="flex gap-1.5 p-2" style={hl === 'tabs' || hl === 'icon' ? hlInline : {}}>
        {[{label: name, color, active: true}, {label:'Layla', color:'#9333ea'}, {label:'Howdy', color:'#ca8a04'}].map((t, i) => (
          <div key={i} className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-bold ${t.active ? 'text-white border border-white/20' : 'text-white/30 border border-white/5'}`} style={{ background: t.active ? t.color + '33' : '' }}>
            <div style={{width:14,height:14,borderRadius:4,background:t.color,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:8,color:'white'}}>
              {t.label[0]}
            </div>
            {t.label}
          </div>
        ))}
      </div>
    </div>
  )

  // ── APPS LIST (config/order) ─────────────────────────────────────────────────
  const AppsList = ({ hl }: { hl?: 'order' | 'active' }) => (
    <div className="bg-[#0d0d1e] border border-white/8 rounded-xl overflow-hidden">
      <div className="px-3 py-2 border-b border-white/5"><p className="text-white/60 text-[9px] font-bold uppercase">Página Apps — Orden de aparición</p></div>
      <div className="divide-y divide-white/5">
        {[
          {n:'Waha', c:'#e91e63', ord:1, act:true},
          {n:'Layla', c:'#9333ea', ord:2, act:true},
          {n:'Howdy', c:'#ca8a04', ord:3, act:true},
          {n:name, c:color, ord: form.sort_order ?? 4, act: form.is_active !== false},
        ].sort((a,b)=>a.ord-b.ord).map((app, i) => (
          <div key={i} className="flex items-center gap-2 px-3 py-1.5" style={app.n === name ? hlInline : {}}>
            <span className="text-white/25 text-[8px] w-3">{app.ord}</span>
            <div style={{width:18,height:18,borderRadius:5,background:app.c,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:8,color:'white'}}>{app.n[0]}</div>
            <span className="text-white/70 text-[9px] font-semibold flex-1">{app.n}</span>
            <div style={hl === 'active' ? hlInline : {}} className="flex items-center gap-1">
              <div style={{width:6,height:6,borderRadius:'50%',background: app.act ? '#22c55e':'#4b5563'}} />
              <span className="text-[8px]" style={{color: app.act ? '#86efac':'#9ca3af'}}>{app.act ? 'Activa':'Oculta'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // ── IA KNOWLEDGE PREVIEW ─────────────────────────────────────────────────────
  const AIPreview = () => (
    <div className="space-y-2">
      <div className="bg-[#0d0d1e] border border-violet-500/20 rounded-xl p-2.5">
        <p className="text-violet-300 text-[9px] font-bold mb-1.5">Prompt de Ángela — sección de esta app:</p>
        <div className="bg-[#07070f] border border-violet-500/10 rounded p-1.5" style={hlInline}>
          <pre className="text-white/50 text-[8px] whitespace-pre-wrap leading-relaxed">{form.ai_knowledge_es?.slice(0,180) || `APP — ${name}:\nDescripción de la plataforma.\nGANANCIAS: X monedas/min | Meta: X = $Y USD\nCÓDIGO AGENCIA: ${form.agency_code || 'XXXXXX'}\nRETIRO: semanal | DESCARGA: https://...`}</pre>
        </div>
      </div>
      <AngelaChat hl="quickreply" />
    </div>
  )

  // ═══════════════════════════════════════════════════════════════════════════
  // Render por paso
  // ═══════════════════════════════════════════════════════════════════════════

  const renders: Record<number, JSX.Element> = {
    1: (<div className="space-y-2">
      <PageTag label="Página Apps" icon="📱" />
      <ClosedCard hl="name" />
      <div className="flex items-center gap-1 my-1"><div className="flex-1 h-px bg-white/5"/><span className="text-white/20 text-[8px]">también en</span><div className="flex-1 h-px bg-white/5"/></div>
      <PageTag label="Admin — Nómina" icon="📊" />
      <NominaList hl="app" />
      <PageTag label="Admin — Canales" icon="📡" />
      <CanalesTabs hl="tabs" />
    </div>),

    2: (<div className="space-y-2">
      <PageTag label="Tarjeta en Página Apps" icon="🎨" />
      <div className="bg-[#0d0d1e] border border-blue-500/15 rounded-xl p-3 flex items-start gap-2.5">
        <div style={hlInline}><Icon size={40} /></div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap mb-1">
            <span className="text-white font-extrabold text-xs">{name}</span>
            <BadgePill label={badge} active />
            {form.payment_min_usd && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 font-bold">Meta mín. ${form.payment_min_usd} USD</span>}
          </div>
          <p className="text-white/45 text-[10px]" style={hlInline}>{form.tagline || '← tu tagline aquí'}</p>
        </div>
      </div>
      <div className="flex gap-3 text-[8px] text-white/30 px-1">
        <span>↑ ícono + color</span><span>↑ badge</span><span>↑ tagline</span>
      </div>
      <PageTag label="Admin — Canales (tabs)" icon="📡" />
      <CanalesTabs hl="icon" />
    </div>),

    3: (<div className="space-y-2">
      <PageTag label="Tarjeta expandida en Apps" icon="📝" />
      <ExpandedCard hl="desc" />
      <PageTag label="Ángela — responde preguntas sobre la app" icon="🤖" />
      <AngelaChat hl="response" />
    </div>),

    4: (<div className="space-y-2">
      <PageTag label="Sección GANANCIAS en la tarjeta de Apps" icon="💰" />
      <ExpandedCard hl="earnings" />
      <div className="bg-blue-500/8 border border-blue-500/15 rounded-lg p-2">
        <p className="text-blue-300 text-[9px] leading-relaxed">💡 Usa formato claro: "Actividad → X unidades", "Meta mínima: X = $Y USD". Aparece tal cual en la tarjeta.</p>
      </div>
      <PageTag label="Ángela — usa este texto para calcular ganancias" icon="🤖" />
      <AngelaChat hl="response" />
    </div>),

    5: (<div className="space-y-2">
      <PageTag label="Admin — Nómina Semanal" icon="📊" />
      <NominaList hl="app" />
      <div className="flex items-center gap-1 my-1"><div className="flex-1 h-px bg-white/5"/><span className="text-white/20 text-[8px]">expandido</span><div className="flex-1 h-px bg-white/5"/></div>
      <NominaExpanded hl={form.nomina_type === 'manual' ? 'manual' : 'cols'} />
    </div>),

    6: (<div className="space-y-2">
      <PageTag label="Admin — Nómina (comisión del agente)" icon="💸" />
      <NominaExpanded hl="commission" />
      <div className="bg-amber-500/8 border border-amber-500/15 rounded-lg p-2">
        <p className="text-amber-300 text-[9px] leading-relaxed">💡 Esta comisión se aplica automáticamente al calcular el salario del agente en la nómina semanal.</p>
      </div>
    </div>),

    7: (<div className="space-y-2">
      <PageTag label="Sección INFORMACIÓN GENERAL en Apps" icon="📋" />
      <ExpandedCard hl="specs" />
      <div className="flex items-center gap-1 my-1"><div className="flex-1 h-px bg-white/5"/><span className="text-white/20 text-[8px]">y también</span><div className="flex-1 h-px bg-white/5"/></div>
      <PageTag label="Sección REQUISITOS ESENCIALES en Apps" icon="✅" />
      <ExpandedCard hl="req" />
    </div>),

    8: (<div className="space-y-2">
      <PageTag label="Modal — Guía de Instalación (contenido)" icon="📖" />
      <GuideModal hl="steps" />
      <div className="bg-violet-500/8 border border-violet-500/15 rounded-lg p-2">
        <p className="text-violet-300 text-[9px] leading-relaxed">💡 Cada paso aparece como un bloque con número, título en color y texto. Puedes subir imagen con el botón 📤.</p>
      </div>
    </div>),

    9: (<div className="space-y-2">
      <PageTag label="Modal — Botones de descarga (Paso 1 del guía)" icon="🔗" />
      <GuideModal hl="download" />
      <div className="flex items-center gap-1 my-1"><div className="flex-1 h-px bg-white/5"/><span className="text-white/20 text-[8px]">y en la tarjeta</span><div className="flex-1 h-px bg-white/5"/></div>
      <ExpandedCard hl="download" />
      {form.agency_code && <>
        <div className="flex items-center gap-1 my-1"><div className="flex-1 h-px bg-white/5"/><span className="text-white/20 text-[8px]">código en guía</span><div className="flex-1 h-px bg-white/5"/></div>
        <ExpandedCard hl="agency" />
      </>}
    </div>),

    10: (<div className="space-y-2">
      <PageTag label="Orden de aparición en Página Apps" icon="⚙️" />
      <AppsList hl="order" />
      <div className="flex items-center gap-1 my-1"><div className="flex-1 h-px bg-white/5"/><span className="text-white/20 text-[8px]">visibilidad</span><div className="flex-1 h-px bg-white/5"/></div>
      <AppsList hl="active" />
      <div className="bg-white/4 border border-white/8 rounded-lg p-2">
        <p className="text-white/40 text-[9px]">Orden 1 = primera en la lista. Apps inactivas no aparecen en ninguna página pública.</p>
      </div>
    </div>),

    11: (<div className="space-y-2">
      <PageTag label="Ángela IA — sistema de prompt dinámico" icon="🤖" />
      <AIPreview />
      <div className="bg-green-500/8 border border-green-500/15 rounded-lg p-2">
        <p className="text-green-300 text-[9px] leading-relaxed">✅ Después de guardar, Ángela aprenderá sobre {name} en máx. 30 minutos. Los quick replies del chat también se actualizan automáticamente.</p>
      </div>
    </div>),
  }

  return (
    <div className="space-y-1">
      <p className="text-[10px] font-bold text-white/25 uppercase tracking-wider mb-2">👁 Dónde aparece en el sitio</p>
      {renders[step] ?? <p className="text-white/30 text-xs">Sin vista previa para este paso.</p>}
    </div>
  )
}
