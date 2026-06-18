// WizardVisualGuide — guía visual mejorada: quién lo ve, dónde aparece, qué significa cada campo

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

// ─── Quién lo ve ────────────────────────────────────────────────────────────
type UserType = 'admin' | 'trabajadora' | 'agente' | 'publico' | 'angela'
const USER_LABELS: Record<UserType, { label: string; color: string; bg: string; border: string; icon: string }> = {
  admin:       { label: 'Admin',        color: 'text-amber-300',  bg: 'bg-amber-500/15',  border: 'border-amber-500/30',  icon: '👑' },
  trabajadora: { label: 'Trabajadoras', color: 'text-green-300',  bg: 'bg-green-500/15',  border: 'border-green-500/30',  icon: '👩‍💻' },
  agente:      { label: 'Agentes',      color: 'text-blue-300',   bg: 'bg-blue-500/15',   border: 'border-blue-500/30',   icon: '🧑‍💼' },
  publico:     { label: 'Visitantes',   color: 'text-purple-300', bg: 'bg-purple-500/15', border: 'border-purple-500/30', icon: '🌍' },
  angela:      { label: 'Ángela IA',    color: 'text-violet-300', bg: 'bg-violet-500/15', border: 'border-violet-500/30', icon: '✦' },
}

function WhoSeesIt({ types }: { types: UserType[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {types.map(t => {
        const u = USER_LABELS[t]
        return (
          <span key={t} className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full border ${u.bg} ${u.border} ${u.color}`}>
            <span>{u.icon}</span>{u.label}
          </span>
        )
      })}
    </div>
  )
}

function InfoBox({ color, icon, title, children }: { color: 'blue'|'green'|'amber'|'violet'|'red'; icon: string; title: string; children: React.ReactNode }) {
  const cls = {
    blue:   'bg-blue-500/8 border-blue-500/20 text-blue-200',
    green:  'bg-green-500/8 border-green-500/20 text-green-200',
    amber:  'bg-amber-500/8 border-amber-500/20 text-amber-200',
    violet: 'bg-violet-500/8 border-violet-500/20 text-violet-200',
    red:    'bg-red-500/8 border-red-500/20 text-red-200',
  }[color]
  return (
    <div className={`border rounded-xl p-3 ${cls}`}>
      <p className="font-bold text-[11px] mb-1">{icon} {title}</p>
      <div className="text-[11px] leading-relaxed opacity-80">{children}</div>
    </div>
  )
}

function StepGuideHeader({ emoji, where, who, explain }: {
  emoji: string; where: string; who: UserType[]; explain: string
}) {
  return (
    <div className="bg-[#0a0a1a] border border-white/8 rounded-xl p-3 space-y-2.5">
      <div className="flex items-start gap-2">
        <span className="text-lg shrink-0 mt-0.5">{emoji}</span>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-extrabold text-white/80 uppercase tracking-wider mb-1">¿Qué es esto?</p>
          <p className="text-[11px] text-white/60 leading-relaxed">{explain}</p>
        </div>
      </div>
      <div>
        <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider mb-1.5">👁 ¿Quién lo verá?</p>
        <WhoSeesIt types={who} />
      </div>
      <div>
        <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider mb-1">📍 ¿Dónde aparece?</p>
        <p className="text-[11px] text-white/50 leading-relaxed">{where}</p>
      </div>
    </div>
  )
}

// ─── Arrow label ─────────────────────────────────────────────────────────────
function ArrowLabel({ text, color = 'yellow' }: { text: string; color?: 'yellow' | 'green' | 'blue' | 'violet' | 'red' }) {
  const cls = {
    yellow: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/8',
    green:  'text-green-400 border-green-400/30 bg-green-400/8',
    blue:   'text-blue-400 border-blue-400/30 bg-blue-400/8',
    violet: 'text-violet-400 border-violet-400/30 bg-violet-400/8',
    red:    'text-red-400 border-red-400/30 bg-red-400/8',
  }[color]
  return (
    <span className={`inline-flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded border ${cls}`}>
      ← {text}
    </span>
  )
}

export default function WizardVisualGuide({ step, form }: Props) {
  const name    = form.display_name || 'Tu App'
  const color   = form.color_hex   || '#9333ea'
  const initial = name[0]?.toUpperCase() || '?'
  const badge   = form.badge_label || 'Retiro semanal'
  const bc      = form.badge_color

  const Icon = ({ size = 36 }: { size?: number }) => (
    <div style={{ width: size, height: size, background: color, borderRadius: Math.round(size * 0.28), overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 900, color: 'white', fontSize: Math.round(size * 0.38) }}>
      {form.icon_url ? <img src={form.icon_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" /> : initial}
    </div>
  )

  const BadgePill = ({ label, highlight }: { label: string; highlight?: boolean }) => {
    const cls = bc === 'red' ? 'bg-red-500/20 text-red-300 border-red-500/40'
              : bc === 'green' ? 'bg-green-500/20 text-green-300 border-green-500/40'
              : bc === 'blue' ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
              : bc === 'yellow' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
              : 'bg-pink-500/20 text-pink-300 border-pink-500/40'
    return (
      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${cls} ${highlight ? 'ring-2 ring-yellow-400 ring-offset-1 ring-offset-[#07070f]' : ''}`}>
        {label}
      </span>
    )
  }

  const hl = { outline: '2px solid rgba(250,204,21,0.85)', outlineOffset: 3, borderRadius: 6 }

  // ── Mini card cerrada ────────────────────────────────────────────────────────
  const CardClosed = ({ hlPart }: { hlPart?: 'icon'|'name'|'badge'|'tagline' }) => (
    <div className="bg-[#0d0d1e] border border-blue-500/15 rounded-xl p-3 flex items-start gap-2.5">
      <div style={hlPart==='icon' ? hl : {}}><Icon size={36} /></div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
          <span className="text-white font-extrabold text-xs" style={hlPart==='name' ? hl : {}}>{name}</span>
          <BadgePill label={badge} highlight={hlPart==='badge'} />
          {form.payment_min_usd && (
            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 font-bold">
              Meta mín. ${form.payment_min_usd} USD
            </span>
          )}
        </div>
        <p className="text-white/45 text-[10px]" style={hlPart==='tagline' ? hl : {}}>{form.tagline || 'Subtítulo de la app...'}</p>
        <p className="text-white/20 text-[9px] mt-0.5 line-clamp-1">{form.description_es || 'Descripción breve...'}</p>
      </div>
      <span className="text-white/20 text-xs">∨</span>
    </div>
  )

  // ── Mini card expandida ──────────────────────────────────────────────────────
  const CardExpanded = ({ hlPart }: { hlPart?: 'desc'|'specs'|'req'|'earnings'|'agency'|'download'|'guide' }) => (
    <div className="bg-[#0d0d1e] border border-blue-500/30 rounded-xl overflow-hidden">
      <div className="p-3 flex items-start gap-2.5 border-b border-white/5">
        <Icon size={28} />
        <div className="flex-1">
          <div className="flex gap-1 flex-wrap"><span className="text-white font-extrabold text-xs">{name}</span><BadgePill label={badge} /></div>
          <p className="text-white/40 text-[9px]">{form.tagline || 'Subtítulo'}</p>
        </div>
      </div>
      <div className="p-2.5 space-y-2">
        {/* botones */}
        <div className="flex gap-1.5 flex-wrap" style={hlPart==='guide' ? hl : {}}>
          <span className="text-[9px] bg-[#1a1a3a] text-blue-300 border border-blue-500/30 px-1.5 py-0.5 rounded-lg font-bold">📖 Guía</span>
          {form.telegram_channel_url && <span className="text-[9px] bg-[#1a1a3a] text-blue-300 border border-blue-500/30 px-1.5 py-0.5 rounded-lg font-bold">✈ Telegram</span>}
          <span className="text-[9px] bg-[#1a1a3a] text-white/50 border border-white/10 px-1.5 py-0.5 rounded-lg">💬 Tutora</span>
        </div>
        {hlPart === 'desc' && (
          <div style={hl}>
            <p className="text-white/60 text-[9px] leading-relaxed">{form.description_es || 'Descripción completa de la app aparece aquí...'}</p>
          </div>
        )}
        {(hlPart === 'specs' || (!hlPart)) && (
          <div style={hlPart==='specs' ? hl : {}}>
            <p className="text-[8px] font-bold text-blue-400/80 mb-1 uppercase tracking-wider">Información General</p>
            <div className="grid grid-cols-3 gap-1">
              {(form.specs?.slice(0,6) ?? [{label:'Android',value:form.name||'—'},{label:'iOS',value:form.ios_name||'—'},{label:'Modo',value:'—'}]).map((s,i) => (
                <div key={i} className="bg-[#07070f] border border-white/5 rounded px-1.5 py-1">
                  <p className="text-white/25 text-[8px]">{s.label}</p>
                  <p className="text-white/70 text-[9px] font-semibold truncate">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {hlPart === 'req' && (
          <div style={hl}>
            <p className="text-[8px] font-bold text-blue-400/80 mb-1 uppercase tracking-wider">Requisitos Esenciales</p>
            <div className="flex flex-wrap gap-1">
              {(form.requisitos?.slice(0,3) ?? ['Mayor de edad','Buen WiFi','4-5h/día']).map((r,i) => (
                <span key={i} className="text-[8px] px-1.5 py-0.5 rounded-full bg-white/5 border border-white/8 text-white/50">✓ {r}</span>
              ))}
            </div>
          </div>
        )}
        {hlPart === 'earnings' && (
          <div style={hl}>
            <p className="text-[8px] font-bold text-blue-400/80 mb-1 uppercase tracking-wider">Ganancias por Actividad</p>
            <pre className="text-white/50 text-[8px] whitespace-pre-wrap leading-relaxed">{form.earnings_info_es?.slice(0,100) || 'Actividad → X monedas\nMeta mínima: X = $Y USD'}</pre>
          </div>
        )}
        {hlPart === 'agency' && form.agency_code && (
          <div style={hl}>
            <p className="text-[8px] font-bold text-blue-400/80 mb-1 uppercase tracking-wider">Código de Agencia</p>
            <div className="bg-blue-500/10 border border-blue-500/25 rounded px-2 py-1 text-center font-mono text-blue-300 font-extrabold text-xs">{form.agency_code}</div>
          </div>
        )}
        {hlPart === 'download' && (
          <div className="flex gap-1 flex-wrap mt-1" style={hl}>
            {form.download_url_android && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-green-500/15 text-green-400 font-semibold border border-green-500/20">🤖 Android</span>}
            {form.download_url_ios && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 font-semibold border border-blue-500/20">🍎 iOS</span>}
          </div>
        )}
      </div>
    </div>
  )

  // ── Guide modal ──────────────────────────────────────────────────────────────
  const GuideModal = ({ hlPart }: { hlPart?: 'steps'|'download' }) => (
    <div className="bg-[#0d0d1e] border border-white/10 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between p-2.5 border-b border-white/5">
        <div className="flex items-center gap-1.5"><Icon size={18} /><span className="text-white/70 text-[10px] font-semibold">Guía — {name}</span></div>
        <span className="text-white/20 text-xs">✕</span>
      </div>
      <div className="p-2.5 space-y-1.5">
        <div className="text-center py-1">
          <p className="font-black text-sm" style={{ color }}>{name.toUpperCase()}</p>
          <p className="text-white/30 text-[8px] uppercase tracking-widest">Guía de Instalación Paso a Paso</p>
        </div>
        <div style={hlPart==='steps' ? hl : {}}>
          {(form.guide_steps?.slice(0,3) ?? [
            {step:1,title:'Descarga la App',text:'Selecciona según tu dispositivo'},
            {step:2,title:'Instala la aplicación',text:'Desde el enlace descargado.'},
          ]).map(s => (
            <div key={s.step} className="bg-[#07070f] border border-white/5 rounded px-2 py-1.5 mb-1">
              <span className="text-[9px] font-bold" style={{ color }}>Paso {s.step} </span>
              <span className="text-[9px] font-bold text-white/70">{s.title}</span>
              <p className="text-white/40 text-[8px] mt-0.5">{s.text?.slice(0,60)}{(s.text?.length || 0) > 60 ? '...' : ''}</p>
            </div>
          ))}
        </div>
        {hlPart === 'download' && (
          <div className="space-y-1 mt-1" style={hl}>
            {form.download_url_android && <div className="w-full text-center bg-[#1a1a3a] border border-green-500/20 rounded py-1 text-[9px] text-green-400 font-bold">🤖 Descargar Android</div>}
            {form.download_url_ios && <div className="w-full text-center bg-[#1a1a3a] border border-blue-500/20 rounded py-1 text-[9px] text-blue-400 font-bold">🍎 Descargar iOS</div>}
            {form.guide_whatsapp && <div className="w-full text-center bg-green-600/20 border border-green-500/30 rounded py-1 text-[9px] text-green-300 font-bold">💬 Enviar Captura + ID por WhatsApp</div>}
          </div>
        )}
      </div>
    </div>
  )

  // ── Nómina mini ──────────────────────────────────────────────────────────────
  const NominaList = ({ hlRow }: { hlRow?: boolean }) => (
    <div className="bg-[#0d0d1e] border border-white/8 rounded-xl overflow-hidden">
      <div className="px-3 py-2 border-b border-white/5"><p className="text-white font-bold text-xs">Nómina Semanal</p></div>
      <div className="divide-y divide-white/5">
        {[{n:name, c:color, active:true},{n:'Layla',c:'#9333ea',active:false},{n:'Howdy',c:'#ca8a04',active:false}].map((app, i) => (
          <div key={i} className="flex items-center gap-2 px-3 py-1.5" style={i===0 && hlRow ? hl : {}}>
            <div style={{width:7,height:7,borderRadius:'50%',background: app.active ? '#22c55e':'#4b5563'}} />
            <div style={{width:20,height:20,borderRadius:5,background:app.c,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:8,color:'white',flexShrink:0}}>{app.n[0]}</div>
            <span className="text-white text-[10px] font-bold flex-1">{app.n}</span>
            {i===0 && <span className="text-[9px] text-violet-300 bg-violet-500/15 border border-violet-500/20 px-1.5 py-0.5 rounded-full">{form.nomina_type === 'manual' ? 'Manual' : 'Upload Excel'}</span>}
            <span className="text-white/20 text-[9px]">∨</span>
          </div>
        ))}
      </div>
    </div>
  )

  const NominaExpanded = ({ hlPart }: { hlPart?: 'commission'|'cols'|'manual' }) => (
    <div className="bg-[#0d0d1e] border border-white/8 rounded-xl overflow-hidden">
      <div className="px-3 py-2 flex items-center gap-2 border-b border-white/5" style={{ background: color + '22' }}>
        <div style={{width:7,height:7,borderRadius:'50%',background:'#22c55e'}} />
        <Icon size={20} />
        <span className="text-white font-extrabold text-xs">{name}</span>
      </div>
      <div className="px-3 py-2 space-y-1.5">
        <div className="flex items-center gap-2" style={hlPart==='commission' ? hl : {}}>
          <span className="text-white/40 text-[9px] flex-1">% Comisión del agente:</span>
          <span className="text-white/70 text-[9px] font-bold">{form.commission_pct_default ?? 10}%</span>
        </div>
        {form.nomina_type === 'manual'
          ? <div className="bg-[#07070f] rounded p-2 space-y-1" style={hlPart==='manual' ? hl : {}}>
              <p className="text-violet-300 text-[9px] font-bold">Entrada Manual de datos</p>
              <div className="grid grid-cols-3 gap-1">
                {['Monedas retiro','Monedas comerc.','% Comisión'].map((f,i) => (
                  <div key={i} className="bg-[#0d0d1e] border border-white/5 rounded px-1.5 py-1">
                    <p className="text-white/30 text-[8px]">{f}</p>
                    <div className="h-2 bg-white/5 rounded mt-1" />
                  </div>
                ))}
              </div>
            </div>
          : <div className="bg-[#07070f] rounded p-2" style={hlPart==='cols' ? hl : {}}>
              <p className="text-white/30 text-[9px] mb-1">Columnas del archivo Excel:</p>
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

  // ── Canales tabs ─────────────────────────────────────────────────────────────
  const CanalesTabs = () => (
    <div className="bg-[#0d0d1e] border border-white/8 rounded-xl overflow-hidden">
      <div className="px-3 py-2 border-b border-white/5"><p className="text-white/60 text-[9px] font-bold uppercase tracking-wider">Admin → Canales</p></div>
      <div className="flex gap-1.5 p-2">
        {[{label:name, color, active:true},{label:'Layla',color:'#9333ea'},{label:'Howdy',color:'#ca8a04'}].map((t,i) => (
          <div key={i} className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-bold ${t.active ? 'text-white border border-white/20' : 'text-white/30 border border-white/5'}`} style={{ background: t.active ? t.color+'33' : '' }}>
            <div style={{width:12,height:12,borderRadius:3,background:t.color,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:7,color:'white'}}>{t.label[0]}</div>
            {t.label}
          </div>
        ))}
      </div>
    </div>
  )

  // ── Apps order list ──────────────────────────────────────────────────────────
  const AppsList = ({ hlPart }: { hlPart?: 'order'|'active' }) => {
    const apps = [
      {n:'Waha',c:'#e91e63',ord:1,act:true},
      {n:'Layla',c:'#9333ea',ord:2,act:true},
      {n:'Howdy',c:'#ca8a04',ord:3,act:true},
      {n:name,c:color,ord:form.sort_order ?? 4,act:form.is_active !== false},
    ].sort((a,b)=>a.ord-b.ord)
    return (
      <div className="bg-[#0d0d1e] border border-white/8 rounded-xl overflow-hidden">
        <div className="px-3 py-2 border-b border-white/5"><p className="text-white/60 text-[9px] font-bold uppercase">Apps — orden en que aparecen</p></div>
        <div className="divide-y divide-white/5">
          {apps.map((app,i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-1.5" style={app.n===name ? hl : {}}>
              <span className="text-white/25 text-[8px] w-3">{app.ord}</span>
              <div style={{width:16,height:16,borderRadius:4,background:app.c,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:7,color:'white'}}>{app.n[0]}</div>
              <span className="text-white/70 text-[9px] font-semibold flex-1">{app.n}</span>
              <div style={hlPart==='active' ? hl : {}} className="flex items-center gap-1">
                <div style={{width:5,height:5,borderRadius:'50%',background:app.act?'#22c55e':'#4b5563'}} />
                <span className="text-[8px]" style={{color:app.act?'#86efac':'#9ca3af'}}>{app.act?'Visible':'Oculta'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // ── Angela chat ──────────────────────────────────────────────────────────────
  const AngelaChat = () => (
    <div className="bg-[#0d0d1e] border border-violet-500/20 rounded-xl overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5" style={{ background: 'linear-gradient(90deg,#1a0a2e,#0d1a3a)' }}>
        <div className="w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center text-white text-[8px]">✦</div>
        <div><p className="text-white font-bold text-[9px]">Ángela — Eclipse Angels IA</p><p className="text-green-400 text-[8px]">● En línea</p></div>
      </div>
      <div className="p-2 space-y-1.5">
        <div className="bg-[#1a1a2e] rounded-lg p-2 max-w-[85%]">
          <p className="text-white/70 text-[9px] leading-relaxed">¡Hola! Puedo ayudarte con información sobre {name} y las demás apps.</p>
        </div>
        <div className="flex flex-wrap gap-1">
          <span className="text-[8px] px-1.5 py-0.5 rounded-full border border-white/15 text-white/50">Info sobre {name}</span>
          <span className="text-[8px] px-1.5 py-0.5 rounded-full border border-white/15 text-white/50">¿Cuánto puedo ganar?</span>
        </div>
      </div>
    </div>
  )

  // ── Perfil de trabajadora ────────────────────────────────────────────────────
  const PerfilCard = ({ hlPart }: { hlPart?: 'app'|'commission' }) => (
    <div className="bg-[#0d0d1e] border border-white/8 rounded-xl overflow-hidden">
      <div className="px-3 py-2 border-b border-white/5"><p className="text-white/60 text-[9px] font-bold uppercase">Mi Perfil — Mis Apps</p></div>
      <div className="divide-y divide-white/5">
        {[{n:name,c:color,active:true},{n:'Waha',c:'#e91e63',active:false}].map((app,i) => (
          <div key={i} className="flex items-center gap-2 px-3 py-2" style={i===0 && hlPart==='app' ? hl : {}}>
            <div style={{width:24,height:24,borderRadius:6,background:app.c,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:10,color:'white'}}>{app.n[0]}</div>
            <div className="flex-1">
              <p className="text-white/70 text-[10px] font-semibold">{app.n}</p>
              <p className="text-white/30 text-[8px]">{i===0 ? 'App activa' : 'Registro pendiente'}</p>
            </div>
            <div style={{width:6,height:6,borderRadius:'50%',background: app.active ? '#22c55e':'#4b5563'}} />
          </div>
        ))}
      </div>
    </div>
  )

  // ── AI Preview ───────────────────────────────────────────────────────────────
  const AIPreview = () => (
    <div className="bg-[#0d0d1e] border border-violet-500/20 rounded-xl p-2.5">
      <p className="text-violet-300 text-[9px] font-bold mb-1.5">✦ Lo que aprenderá Ángela sobre {name}:</p>
      <div className="bg-[#07070f] border border-violet-500/10 rounded p-1.5" style={hl}>
        <pre className="text-white/50 text-[8px] whitespace-pre-wrap leading-relaxed">{form.ai_knowledge_es?.slice(0,200) || `APP — ${name}:\nTipo de actividad y cómo funciona.\nGANANCIAS: X monedas/min | Meta: X = $Y USD\nCÓDIGO AGENCIA: ${form.agency_code || 'XXXXXX'}\nRETIRO: semanal\nDESCARGA: https://...`}</pre>
      </div>
    </div>
  )

  // ─────────────────────────────────────────────────────────────────────────────
  // Render por paso
  // ─────────────────────────────────────────────────────────────────────────────

  const steps: Record<number, JSX.Element> = {

    // ── PASO 1 ─── Nombre e identidad ─────────────────────────────────────────
    1: (
      <div className="space-y-3">
        <StepGuideHeader
          emoji="🏷️"
          explain="El nombre de la app tiene dos partes: el nombre INTERNO (solo lo ve el sistema, nunca lo verás en la web) y el nombre VISIBLE (lo que leen las trabajadoras y agentes en el sitio)."
          who={['admin','trabajadora','agente']}
          where="Aparece en: página Apps, sección Nómina, panel de Canales, y en todos los filtros del Admin."
        />
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider">Vista previa en la tarjeta de Apps:</p>
          <div className="relative">
            <CardClosed hlPart="name" />
            <div className="flex justify-between mt-1 px-1">
              <ArrowLabel text="nombre visible" color="yellow" />
            </div>
          </div>
        </div>
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider">Vista previa en la Nómina (Admin):</p>
          <NominaList hlRow />
        </div>
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider">Vista previa en Canales (Admin):</p>
          <CanalesTabs />
        </div>
        <InfoBox color="blue" icon="ℹ️" title="Nombre interno vs visible">
          <p>El <strong>nombre interno</strong> (ej: <span className="font-mono">MiApp</span>) es como el apellido del sistema. No tiene espacios y no cambia nunca.</p>
          <p className="mt-1">El <strong>nombre visible</strong> (ej: <span className="font-mono">Mi App</span>) es lo que leerán las personas en la web. Puede tener espacios y tildes.</p>
        </InfoBox>
      </div>
    ),

    // ── PASO 2 ─── Visual ─────────────────────────────────────────────────────
    2: (
      <div className="space-y-3">
        <StepGuideHeader
          emoji="🎨"
          explain="El logo, el color, el tagline y el badge son lo primero que ve cualquier persona cuando entra a la página de Apps. Es como la portada del libro — tiene que llamar la atención."
          who={['trabajadora','agente','publico']}
          where="En la tarjeta de la app (página Apps) y en las pestañas del panel Canales del Admin."
        />
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider">Tarjeta de la app — vista previa:</p>
          <div className="bg-[#0d0d1e] border border-blue-500/15 rounded-xl p-3 flex items-start gap-2.5">
            <div style={hl}><Icon size={40} /></div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap mb-1">
                <span className="text-white font-extrabold text-xs">{name}</span>
                <BadgePill label={badge} highlight />
              </div>
              <p className="text-white/45 text-[10px]" style={hl}>{form.tagline || '← tu tagline aquí'}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1 px-1 text-center">
            <ArrowLabel text="logo / ícono" color="yellow" />
            <ArrowLabel text="badge" color="green" />
            <ArrowLabel text="tagline" color="blue" />
          </div>
        </div>
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider">Panel Canales (Admin) — pestañas:</p>
          <CanalesTabs />
          <p className="text-[9px] text-white/30 px-1">↑ El ícono y color de tu app aparecen aquí como una pestaña</p>
        </div>
        <InfoBox color="amber" icon="💡" title="¿Qué es el tagline?">
          Es el subtítulo corto debajo del nombre. Describe las actividades de la app en pocas palabras. Ejemplo: <em>"Mensajería · Salas de Audio · Videollamadas"</em>
        </InfoBox>
        <InfoBox color="violet" icon="🏷️" title="¿Qué es el badge?">
          Es la etiqueta de colores junto al nombre. Sirve para que las trabajadoras sepan rápidamente cómo paga (ej: <em>"Retiro semanal"</em>).
        </InfoBox>
      </div>
    ),

    // ── PASO 3 ─── Descripción ────────────────────────────────────────────────
    3: (
      <div className="space-y-3">
        <StepGuideHeader
          emoji="📝"
          explain="La descripción es el texto largo que explica QUÉ hace la app y CÓMO funciona. Se muestra cuando alguien hace clic en la tarjeta para verla expandida. También la lee Ángela (la IA) para responder preguntas."
          who={['trabajadora','agente','publico','angela']}
          where="En la tarjeta expandida de la página Apps (cuando alguien hace clic en la app para ver más detalles)."
        />
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider">Tarjeta expandida — sección descripción:</p>
          <CardExpanded hlPart="desc" />
          <p className="text-[9px] text-white/30 px-1">↑ El texto resaltado es donde aparece tu descripción</p>
        </div>
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider">Ángela (chat IA) — usará tu descripción para responder:</p>
          <AngelaChat />
        </div>
        <InfoBox color="blue" icon="🌍" title="¿Por qué hay versión en Español y Portugués?">
          La web detecta automáticamente el idioma del navegador de la usuaria. Si está en Brasil, ve el texto en portugués. Si no hay texto en portugués, muestra el español.
        </InfoBox>
      </div>
    ),

    // ── PASO 4 ─── Ganancias ──────────────────────────────────────────────────
    4: (
      <div className="space-y-3">
        <StepGuideHeader
          emoji="💰"
          explain="Aquí defines cuánto dinero puede ganar una trabajadora con esta app. También el Código de Agencia — sin ese código la trabajadora NO puede cobrar. Este es uno de los campos más importantes."
          who={['trabajadora','agente','angela']}
          where="En la tarjeta expandida (sección Ganancias) + en la Guía de Instalación + en las respuestas de Ángela."
        />
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider">Tarjeta expandida — sección ganancias:</p>
          <CardExpanded hlPart="earnings" />
        </div>
        {form.agency_code && (
          <div className="space-y-1.5">
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider">Código de agencia — aparece en la guía:</p>
            <CardExpanded hlPart="agency" />
          </div>
        )}
        <InfoBox color="red" icon="⚠️" title="El Código de Agencia es OBLIGATORIO">
          Sin este código la trabajadora no puede activar la monetización en la app. Siempre ponlo aunque sea el único campo que llenes en este paso. Aparece claramente en la guía de instalación.
        </InfoBox>
        <InfoBox color="green" icon="💡" title="Formato de ganancias recomendado">
          <pre className="font-mono text-[9px] mt-1 whitespace-pre-wrap opacity-80">{`Mensajes VIP: 70 monedas\nVideollamada/min: 700 monedas\nMeta mínima: 10,000 = $2.50 USD\nPago: martes a viernes`}</pre>
        </InfoBox>
      </div>
    ),

    // ── PASO 5 ─── Nómina ─────────────────────────────────────────────────────
    5: (
      <div className="space-y-3">
        <StepGuideHeader
          emoji="📊"
          explain="Aquí configuras cómo el sistema sabrá cuánto ganó cada trabajadora. Hay dos métodos: Excel (la app lo genera y lo subes) o Manual (tú escribes los números a mano). SOLO tú (Admin) ves esta sección."
          who={['admin']}
          where="En Admin → pestaña Nómina. Las trabajadoras y agentes NUNCA ven esto."
        />

        {/* Upload vs Manual selector mockup */}
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider">Elige el método de nómina:</p>
          <div className="bg-[#0d0d1e] border border-white/8 rounded-xl p-2.5 flex gap-2">
            <div className={`flex-1 rounded-lg p-2 border text-center ${form.nomina_type !== 'manual' ? 'border-violet-500/50 bg-violet-500/10' : 'border-white/8 bg-[#07070f]'}`}>
              <p className="text-xs font-bold text-white/70">📂 Upload</p>
              <p className="text-[9px] text-white/30 mt-0.5">Excel generado por la app</p>
            </div>
            <div className={`flex-1 rounded-lg p-2 border text-center ${form.nomina_type === 'manual' ? 'border-violet-500/50 bg-violet-500/10' : 'border-white/8 bg-[#07070f]'}`}>
              <p className="text-xs font-bold text-white/70">✏️ Manual</p>
              <p className="text-[9px] text-white/30 mt-0.5">Tú escribes los valores</p>
            </div>
          </div>
          <p className="text-[9px] text-white/25 px-1">↑ Selecciona el que aplica a esta app. Puedes cambiarlo después.</p>
        </div>

        {/* Upload: columnas del Excel */}
        {form.nomina_type !== 'manual' && (
          <div className="space-y-1.5">
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider">Upload — columnas del Excel:</p>
            <div className="bg-[#0d0d1e] border border-white/8 rounded-xl p-2.5 space-y-2">
              {[
                { label: '🔑 ID trabajadora', val: 'UID del Host', color: 'text-white/50' },
                { label: '💚 Salario (USD)', val: 'USD', color: 'text-emerald-300' },
                { label: '🟡 Base Comisión Admin', val: 'Monedas Comerciales (opcional)', color: 'text-amber-300' },
                { label: '👤 Nombre / Apodo', val: 'Apodo', color: 'text-white/40' },
              ].map((row, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-[9px] text-white/35 w-28 shrink-0">{row.label}</span>
                  <div className="flex-1 bg-[#07070f] border border-white/8 rounded px-2 py-1">
                    <span className={`text-[9px] font-mono ${row.color}`}>{row.val}</span>
                  </div>
                </div>
              ))}
              <div className="mt-1 bg-amber-500/8 border border-amber-500/15 rounded-lg p-2">
                <p className="text-[9px] text-amber-300 leading-relaxed">🟡 <strong>Base Comisión Admin</strong>: si la comisión NO se calcula sobre el salario sino sobre otro número (ej: Monedas Comerciales), escribe aquí el nombre de esa columna del Excel. Si lo dejas vacío, usa la columna de salario.</p>
              </div>
            </div>
          </div>
        )}

        {/* Manual: campos + tasa + combinación */}
        {form.nomina_type === 'manual' && (
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider">Manual — ejemplo Layla (3 campos):</p>
            <div className="bg-[#0d0d1e] border border-white/8 rounded-xl p-2.5 space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[9px] text-white/30">Tasa:</span>
                <div className="bg-[#07070f] border border-white/8 rounded px-2 py-0.5">
                  <span className="text-[9px] font-mono text-violet-300">15500</span>
                </div>
                <span className="text-[9px] text-white/25">monedas = $1 USD</span>
              </div>
              {[
                { label: 'Monedas retiradas', salary: true, comm: false },
                { label: 'Monedas comerciales', salary: false, comm: true },
                { label: 'Porcentaje', salary: false, comm: false },
              ].map((f, i) => (
                <div key={i} className="bg-[#07070f] border border-white/5 rounded-lg p-2 space-y-1">
                  <p className="text-[9px] text-white/60 font-bold">{f.label}</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className={`text-[8px] px-1.5 py-0.5 rounded border ${f.salary ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' : 'bg-white/5 text-white/20 border-white/8'}`}>
                      💚 Base Salario
                    </span>
                    <span className={`text-[8px] px-1.5 py-0.5 rounded border ${f.comm ? 'bg-amber-500/15 text-amber-300 border-amber-500/30' : 'bg-white/5 text-white/20 border-white/8'}`}>
                      🟡 Base Comisión
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Multi-field combine mockup */}
            <div className="bg-[#0d0d1e] border border-violet-500/20 rounded-xl p-2.5 space-y-2">
              <p className="text-[9px] font-bold text-violet-300/70 uppercase tracking-wider">¿Tienes 2+ campos de salario? — Elige el operador:</p>
              <div className="flex items-center gap-1.5 flex-wrap">
                <div className="bg-[#07070f] border border-emerald-500/25 rounded px-2 py-1">
                  <span className="text-[9px] text-emerald-300 font-mono">MonedaTipoA</span>
                </div>
                <div className="flex gap-1">
                  {['＋ Sumar', '－ Restar', '× Multiplicar'].map((op, i) => (
                    <div key={i} className={`px-1.5 py-0.5 rounded border text-[8px] font-bold ${i === 0 ? 'border-emerald-500/50 bg-emerald-500/15 text-emerald-300' : 'border-white/10 bg-[#07070f] text-white/25'}`}>{op}</div>
                  ))}
                </div>
                <div className="bg-[#07070f] border border-emerald-500/25 rounded px-2 py-1">
                  <span className="text-[9px] text-emerald-300 font-mono">MonedaTipoB</span>
                </div>
              </div>
              <p className="text-[9px] text-white/30 leading-relaxed">Este selector aparece automáticamente cuando marcas 2 o más campos como "Base Salario" o "Base Comisión". Por defecto suma (más común).</p>
            </div>
          </div>
        )}

        {/* Formula preview mockup */}
        <div className="bg-[#07070f] border border-emerald-500/15 rounded-xl p-2.5 space-y-1.5">
          <p className="text-[9px] font-bold text-emerald-400/70 uppercase tracking-wider">⚡ Vista previa del cálculo — se actualiza en vivo:</p>
          {form.nomina_type === 'manual' ? (
            <div className="space-y-1 text-[9px] font-mono">
              <div className="flex items-center gap-1 flex-wrap text-white/40">
                <span>USD bruto =</span>
                <span className="bg-emerald-500/15 text-emerald-300 border border-emerald-500/20 px-1.5 py-0.5 rounded">Monedas retiradas</span>
                <span>÷ 15,500</span>
              </div>
              <div className="flex items-center gap-1 flex-wrap">
                <span className="text-emerald-400/80">💚 Salario chica =</span>
                <span className="text-emerald-300/60">USD bruto (valor completo)</span>
              </div>
              <div className="flex items-center gap-1 flex-wrap">
                <span className="text-amber-400/80">🟡 Comisión → Admin =</span>
                <span className="bg-amber-500/15 text-amber-300 border border-amber-500/20 px-1.5 py-0.5 rounded">Monedas comerciales</span>
                <span className="text-white/30">÷ 15,500 × 10%</span>
              </div>
            </div>
          ) : (
            <div className="space-y-1 text-[9px] font-mono">
              <div className="flex items-center gap-1 flex-wrap">
                <span className="text-emerald-400/80">💚 Salario chica =</span>
                <span className="bg-emerald-500/15 text-emerald-300 border border-emerald-500/20 px-1.5 py-0.5 rounded">USD</span>
                <span className="text-white/30">(columna del Excel, íntegro)</span>
              </div>
              <div className="flex items-center gap-1 flex-wrap">
                <span className="text-amber-400/80">🟡 Comisión → Admin =</span>
                <span className="bg-amber-500/15 text-amber-300 border border-amber-500/20 px-1.5 py-0.5 rounded">USD</span>
                <span className="text-white/30">× 10%</span>
              </div>
            </div>
          )}
          <p className="text-[8px] text-blue-300/60">ℹ️ La comisión NO se descuenta del salario de la chica — va directo a Admin → Comisiones.</p>
        </div>

        <NominaList hlRow />
      </div>
    ),

    // ── PASO 6 ─── Comisión ────────────────────────────────────────────────────
    6: (
      <div className="space-y-3">
        <StepGuideHeader
          emoji="💸"
          explain="La comisión es el porcentaje que tú (Admin/Agente) ganas cuando una trabajadora cobra. Por ejemplo: si pones 10%, y la trabajadora ganó $100, tú obtienes $10 — pero la trabajadora igual recibe sus $100 completos. La comisión viene APARTE."
          who={['admin','agente']}
          where="En Admin → Nómina (al expandir una app). Los agentes ven sus comisiones en su propio panel."
        />
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider">Panel expandido en Nómina — porcentaje de comisión:</p>
          <NominaExpanded hlPart="commission" />
          <p className="text-[9px] text-white/30 px-1">↑ El % que pongas aparece aquí al expandir la app en la nómina</p>
        </div>
        <InfoBox color="green" icon="✅" title="La trabajadora siempre recibe su salario completo">
          <p>La comisión NO se le descuenta a la trabajadora. Sale de otra fuente.</p>
          <p className="mt-1">Ejemplo: chica ganó $50 · comisión 10% → <strong>ella recibe $50</strong> · tú recibes $5 en tu panel de comisiones.</p>
        </InfoBox>
        <InfoBox color="amber" icon="💱" title="¿Qué es el cambio CUP?">
          Si activas esta opción, el panel mostrará el valor de la comisión también en Pesos Cubanos (CUP), usando la tasa que configures en Admin → Nómina → Tipo de Cambio.
        </InfoBox>
      </div>
    ),

    // ── PASO 7 ─── Specs + Requisitos ─────────────────────────────────────────
    7: (
      <div className="space-y-3">
        <StepGuideHeader
          emoji="📋"
          explain="Las especificaciones son datos concretos de la app (nombre Android, nombre iOS, horas mínimas, meta diaria...). Los requisitos son las condiciones que debe cumplir la trabajadora para unirse (mayor de edad, WiFi, etc.)."
          who={['trabajadora','agente','publico']}
          where="En la tarjeta expandida de la página Apps — sección 'Información General' y sección 'Requisitos Esenciales'."
        />
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider">Tarjeta expandida — sección Información General:</p>
          <CardExpanded hlPart="specs" />
          <p className="text-[9px] text-white/30 px-1">↑ Cada par etiqueta+valor que agregues aparece como una de estas celdas</p>
        </div>
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider">Tarjeta expandida — sección Requisitos Esenciales:</p>
          <CardExpanded hlPart="req" />
          <p className="text-[9px] text-white/30 px-1">↑ Cada requisito que agregues aparece como una etiqueta con ✓</p>
        </div>
        <InfoBox color="blue" icon="💡" title="Ejemplos de especificaciones">
          <div className="grid grid-cols-2 gap-1 mt-1">
            {[['Android','Waha'],['iOS','Liyo'],['Tiempo diario','+4 horas'],['Meta mínima','$2.50 USD'],['Disponible en','Todo el mundo'],['Modo','Video + Audio']].map(([k,v]) => (
              <div key={k} className="bg-white/5 rounded px-1.5 py-0.5">
                <p className="text-[8px] text-white/30">{k}</p>
                <p className="text-[9px] text-white/70 font-semibold">{v}</p>
              </div>
            ))}
          </div>
        </InfoBox>
      </div>
    ),

    // ── PASO 8 ─── Guía de instalación ────────────────────────────────────────
    8: (
      <div className="space-y-3">
        <StepGuideHeader
          emoji="📖"
          explain="La guía de instalación es un tutorial paso a paso que aparece cuando la trabajadora hace clic en el botón 'Guía' de la app. Explica cómo descargar, instalar, crear cuenta y empezar a trabajar. Puedes añadir imágenes a cada paso."
          who={['trabajadora','agente']}
          where="En la ventana emergente 'Guía de Instalación' que se abre al hacer clic en el botón 📖 Guía dentro de la tarjeta de la app."
        />
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider">Ventana emergente — Guía de Instalación:</p>
          <GuideModal hlPart="steps" />
          <p className="text-[9px] text-white/30 px-1">↑ Cada paso que agregues aparece como uno de estos bloques numerados</p>
        </div>
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider">El botón que abre la guía está en la tarjeta:</p>
          <CardExpanded hlPart="guide" />
        </div>
        <InfoBox color="violet" icon="📸" title="¿Cómo subir imágenes a los pasos?">
          En cada paso hay un botón 📤. Al hacer clic, seleccionas la imagen de tu computadora y se sube automáticamente a Supabase. El link se completa solo — no tienes que copiar nada.
        </InfoBox>
        <InfoBox color="green" icon="💬" title="¿Para qué es el WhatsApp en la guía?">
          Al final de la guía aparece un botón verde de WhatsApp. La trabajadora lo usa para enviar su captura de pantalla con el ID de la app al agente, confirmando que se registró correctamente.
        </InfoBox>
      </div>
    ),

    // ── PASO 9 ─── Links de descarga ──────────────────────────────────────────
    9: (
      <div className="space-y-3">
        <StepGuideHeader
          emoji="🔗"
          explain="Los links de descarga son los botones que la trabajadora usa para instalar la app en su teléfono. Android va a Play Store (o APK), iOS va a App Store. También puedes agregar el canal de Telegram para que se enteren de noticias."
          who={['trabajadora','agente']}
          where="En la ventana emergente de la Guía (botones de descarga) y en la tarjeta expandida de la app (badges Android / iOS)."
        />
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider">Dentro de la guía — botones de descarga:</p>
          <GuideModal hlPart="download" />
        </div>
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider">En la tarjeta expandida — badges de descarga:</p>
          <CardExpanded hlPart="download" />
        </div>
        <InfoBox color="blue" icon="🤖" title="¿Solo Android? Deja iOS vacío">
          Si la app solo existe para Android (como Howdy), simplemente deja vacío el campo de iOS. El botón de iOS no aparecerá.
        </InfoBox>
        <InfoBox color="green" icon="📢" title="Canal de Telegram">
          Si tienes un canal de Telegram para esta app, ponlo aquí. Aparecerá un botón "Unirse al canal" en la tarjeta expandida, junto al botón de Guía.
        </InfoBox>
      </div>
    ),

    // ── PASO 10 ─── Configuración final ───────────────────────────────────────
    10: (
      <div className="space-y-3">
        <StepGuideHeader
          emoji="⚙️"
          explain="El orden decide en qué posición aparece tu app en la lista (1 = primera). La visibilidad decide si la app se muestra o se esconde. Una app OCULTA no aparece en ninguna página pública, pero sigue existiendo en el sistema."
          who={['publico','trabajadora','agente']}
          where="En la página Apps — controla el orden y si la app es visible. También en Admin (gestión de apps)."
        />
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider">Página Apps — orden de aparición:</p>
          <AppsList hlPart="order" />
          <p className="text-[9px] text-white/30 px-1">↑ Tu app aparece en la posición del número que elegiste</p>
        </div>
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider">Estado visible / oculta:</p>
          <AppsList hlPart="active" />
          <p className="text-[9px] text-white/30 px-1">↑ El punto verde = visible para todos · gris = oculta del público</p>
        </div>
        <InfoBox color="amber" icon="💡" title="¿Cuándo usar 'Oculta'?">
          Usa esta opción cuando estés configurando la app y no quieras que aparezca aún en el sitio. Cuando todo esté listo, la activas con un clic y aparece inmediatamente para todos.
        </InfoBox>
      </div>
    ),

    // ── PASO 11 ─── Conocimiento IA ───────────────────────────────────────────
    11: (
      <div className="space-y-3">
        <StepGuideHeader
          emoji="🤖"
          explain="Ángela es la inteligencia artificial del sitio. Este texto es lo que le 'enseñas' sobre esta app. Cuando alguien le pregunte '¿Cuánto gano en [app]?' o '¿Cómo me registro?', Ángela usará EXACTAMENTE este texto para responder. Si lo dejas vacío, solo sabrá el nombre de la app."
          who={['angela']}
          where="En el chat de Ángela (botón flotante en el sitio). También en los quick replies (sugerencias de preguntas rápidas)."
        />
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider">Lo que aprenderá Ángela:</p>
          <AIPreview />
        </div>
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider">Cómo lo usa Ángela en el chat:</p>
          <AngelaChat />
        </div>
        <InfoBox color="violet" icon="✦" title="¿Qué incluir en el conocimiento de Ángela?">
          <ul className="space-y-0.5 mt-0.5">
            <li>✅ Nombre de la app y qué tipo de actividades tiene</li>
            <li>✅ Cuánto se gana (tarifas + meta mínima en USD)</li>
            <li>✅ Código de agencia</li>
            <li>✅ Cuándo y cómo se retira el dinero</li>
            <li>✅ Links de descarga (Android / iOS)</li>
            <li>✅ Requisitos para unirse</li>
          </ul>
        </InfoBox>
        <InfoBox color="green" icon="⏱️" title="¿Cuándo empieza a saber Ángela?">
          Después de guardar, Ángela aprende sobre esta app en máximo 30 minutos. Los quick replies (sugerencias de preguntas) también se actualizan solos.
        </InfoBox>
      </div>
    ),
  }

  return (
    <div className="space-y-1">
      <p className="text-[10px] font-bold text-white/20 uppercase tracking-wider mb-2">👁 Guía visual — ¿Dónde aparece esto?</p>
      {steps[step] ?? <p className="text-white/30 text-xs text-center py-8">Sin vista previa para este paso.</p>}
    </div>
  )
}
