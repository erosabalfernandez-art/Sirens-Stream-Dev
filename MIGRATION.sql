-- =====================================================================
-- MIGRATION: Ampliar apps_catalog con todos los campos del wizard
-- INSTRUCCIONES: Pegar en Supabase Studio → SQL Editor → Run
-- URL: https://supabase.com/dashboard/project/eyeklnjwbyvsgirsglbx/sql
-- =====================================================================

-- 1. AÑADIR COLUMNAS NUEVAS
ALTER TABLE apps_catalog ADD COLUMN IF NOT EXISTS tagline TEXT;
ALTER TABLE apps_catalog ADD COLUMN IF NOT EXISTS badge_label TEXT;
ALTER TABLE apps_catalog ADD COLUMN IF NOT EXISTS badge_color TEXT DEFAULT 'red';
ALTER TABLE apps_catalog ADD COLUMN IF NOT EXISTS specs JSONB;
ALTER TABLE apps_catalog ADD COLUMN IF NOT EXISTS requisitos JSONB;
ALTER TABLE apps_catalog ADD COLUMN IF NOT EXISTS nomina_type TEXT DEFAULT 'upload';
ALTER TABLE apps_catalog ADD COLUMN IF NOT EXISTS nomina_col_uid TEXT DEFAULT 'UID del Host';
ALTER TABLE apps_catalog ADD COLUMN IF NOT EXISTS nomina_col_usd TEXT DEFAULT 'USD';
ALTER TABLE apps_catalog ADD COLUMN IF NOT EXISTS nomina_col_apodo TEXT DEFAULT 'Apodo';
ALTER TABLE apps_catalog ADD COLUMN IF NOT EXISTS nomina_col_semana TEXT DEFAULT 'Semana';
ALTER TABLE apps_catalog ADD COLUMN IF NOT EXISTS nomina_col_metric TEXT DEFAULT 'Diamantes Totales';
ALTER TABLE apps_catalog ADD COLUMN IF NOT EXISTS nomina_metric_label TEXT DEFAULT 'Diamantes';
ALTER TABLE apps_catalog ADD COLUMN IF NOT EXISTS nomina_currency TEXT DEFAULT 'USD';
ALTER TABLE apps_catalog ADD COLUMN IF NOT EXISTS nomina_manual_fields JSONB;
ALTER TABLE apps_catalog ADD COLUMN IF NOT EXISTS nomina_rate NUMERIC;
ALTER TABLE apps_catalog ADD COLUMN IF NOT EXISTS payment_frequency TEXT DEFAULT 'semanal';
ALTER TABLE apps_catalog ADD COLUMN IF NOT EXISTS payment_min_usd NUMERIC DEFAULT 2.5;
ALTER TABLE apps_catalog ADD COLUMN IF NOT EXISTS uses_cup_exchange BOOLEAN DEFAULT true;
ALTER TABLE apps_catalog ADD COLUMN IF NOT EXISTS commission_pct_default NUMERIC DEFAULT 10;
ALTER TABLE apps_catalog ADD COLUMN IF NOT EXISTS guide_steps JSONB;
ALTER TABLE apps_catalog ADD COLUMN IF NOT EXISTS guide_whatsapp TEXT;
ALTER TABLE apps_catalog ADD COLUMN IF NOT EXISTS uses_direct_payment_notification BOOLEAN DEFAULT false;

-- 2. POBLAR APPS EXISTENTES CON SUS DATOS

-- WAHA
UPDATE apps_catalog SET
  tagline = 'Mensajería · Salas de Audio · Videollamadas',
  badge_label = 'Retiro semanal',
  badge_color = 'red',
  specs = '[
    {"label":"Android","value":"Waha"},
    {"label":"iOS","value":"Liyo"},
    {"label":"Tiempo diario","value":"+4 Horas"},
    {"label":"Modo","value":"Mensajes, Salas Audio, Videollamadas, Match"},
    {"label":"Retiro mínimo","value":"Semanal (No acumulable)"},
    {"label":"Meta mínima","value":"$2.50 USD (10,000 diamantes)"}
  ]'::jsonb,
  requisitos = '["Ser mayor de edad","Contar con buen WiFi/datos","Disponible 4–5 horas diarias"]'::jsonb,
  nomina_type = 'upload',
  nomina_col_uid = 'UID del Host',
  nomina_col_usd = 'USD',
  nomina_col_apodo = 'Apodo',
  nomina_col_semana = 'Semana',
  nomina_col_metric = 'Diamantes Totales',
  nomina_metric_label = 'Diamantes',
  nomina_currency = 'USD',
  payment_frequency = 'semanal',
  payment_min_usd = 2.5,
  uses_cup_exchange = true,
  commission_pct_default = 10,
  guide_whatsapp = '',
  guide_steps = '[
    {"step":1,"title":"Descarga la App","text":"Selecciona el botón de descarga según tu dispositivo (Android o iOS)."},
    {"step":2,"title":"Instala la aplicación","text":"Instala la aplicación desde el enlace descargado."},
    {"step":3,"title":"Entrar con Google","text":"Abre la app y selecciona Entrar con Google."},
    {"step":4,"title":"Elige cuenta Gmail","text":"Elige una cuenta de correo Gmail para registrarte."},
    {"step":5,"title":"Crea tu perfil","text":"Agrega una foto de perfil y completa la información."},
    {"step":6,"title":"Captura y envía tu ID","text":"Haz una captura completa de tu perfil, copia tu ID de usuario y envíalo todo por WhatsApp.","image_url":"/images/waha-guide-captura.png"}
  ]'::jsonb,
  uses_direct_payment_notification = false
WHERE name = 'Waha';

-- LAYLA
UPDATE apps_catalog SET
  tagline = 'Mensajes · Salas de Audio · Llamadas de Voz · Videollamadas opcionales',
  badge_label = 'Retiros acumulativos',
  badge_color = 'purple',
  specs = '[
    {"label":"Android","value":"Layla"},
    {"label":"iOS","value":"Nivi"},
    {"label":"Tiempo diario","value":"+4 Horas"},
    {"label":"Modo","value":"Mensajes, Salas de Audio, Llamadas de Voz, Video opc."},
    {"label":"Retiro","value":"Acumulable"},
    {"label":"Meta mínima","value":"$10 USD"}
  ]'::jsonb,
  requisitos = '["Mayor de edad","WiFi / Datos estables","4–5 horas diarias"]'::jsonb,
  nomina_type = 'manual',
  nomina_manual_fields = '[
    {"key":"retiradas","label":"Monedas retiradas","type":"number","is_usd_base":true,"is_commission_base":false},
    {"key":"comerciales","label":"Monedas comerciales","type":"number","is_usd_base":false,"is_commission_base":true},
    {"key":"porcentaje","label":"Porcentaje","type":"number","is_usd_base":false,"is_commission_base":false}
  ]'::jsonb,
  nomina_rate = 15500,
  nomina_metric_label = 'Monedas',
  nomina_currency = 'USD',
  payment_frequency = 'acumulativo',
  payment_min_usd = 10,
  uses_cup_exchange = false,
  commission_pct_default = 10,
  guide_whatsapp = '',
  guide_steps = '[
    {"step":1,"title":"Descarga la App","text":"Selecciona el botón de descarga según tu dispositivo (Android o iOS)."},
    {"step":2,"title":"Instala la aplicación","text":"Instala la aplicación desde el enlace descargado."},
    {"step":3,"title":"Selección de Género","text":"Selecciona Femenino como tu sexo. Esta elección es permanente y no se puede modificar."},
    {"step":4,"title":"Configuración Inicial","text":"Foto de perfil: imagen real, alta calidad (no IA). Nombre y etiquetas: ingresa nombre y etiquetas de interés."},
    {"step":5,"title":"Código de Agencia","text":"Agrega el código para habilitar monetización. Sin este código NO se puede monetizar la app."},
    {"step":6,"title":"Verificación de Identidad","text":"Completa la verificación para autenticar tu perfil. Usa tu foto real, alta calidad."},
    {"step":7,"title":"Completa tu Perfil","text":"Álbum: imágenes reales variadas. Audio: voz clara y auténtica. Descripción: biografía completa."}
  ]'::jsonb,
  uses_direct_payment_notification = true
WHERE name = 'Layla';

-- HOWDY
UPDATE apps_catalog SET
  tagline = 'Videollamadas · Mensajes · Live Streaming · Match',
  badge_label = 'Retiro semanal',
  badge_color = 'yellow',
  specs = '[
    {"label":"Android","value":"Howdy"},
    {"label":"iOS","value":"No disponible"},
    {"label":"Tiempo diario","value":"+3 Horas"},
    {"label":"Modo","value":"Videollamadas, Live, Match, Mensajes"},
    {"label":"Retiro","value":"Acumulable (1x/semana)"},
    {"label":"Meta mínima","value":"$10 USD (100,000 pts)"}
  ]'::jsonb,
  requisitos = '["Mayor de edad","WiFi / Datos estables","Login con cuenta Google","Foto real para verificación"]'::jsonb,
  nomina_type = 'upload',
  nomina_col_uid = 'UID del Host',
  nomina_col_usd = 'USD',
  nomina_col_apodo = 'Apodo',
  nomina_col_semana = 'Semana',
  nomina_col_metric = 'Puntos Totales',
  nomina_metric_label = 'Puntos',
  nomina_currency = 'USD',
  payment_frequency = 'semanal',
  payment_min_usd = 10,
  uses_cup_exchange = true,
  commission_pct_default = 10,
  guide_whatsapp = 'https://wa.me/5595984381686?text=Hola%2C%20quiero%20registrarme%20en%20Howdy',
  guide_steps = '[
    {"step":1,"title":"Descarga la App","text":"Descarga la app para Android (APK directo)."},
    {"step":2,"title":"Log in with Google","text":"Abre la app y selecciona Log in with Google."},
    {"step":3,"title":"Código de Agencia","text":"Llena tu información y agrega el Código de Agencia. Obligatorio para monetización."},
    {"step":4,"title":"Verificación","text":"Sube tu foto de Cover. Agrega 3 fotos al álbum, tu nickname e introducción. Haz clic en Submit y espera aprobación."},
    {"step":5,"title":"Autenticación de identidad","text":"Tómate una foto en vivo para confirmar tu identidad. Usa buena iluminación y fondo limpio."},
    {"step":6,"title":"Captura y envía tu ID","text":"Copia tu ID de usuario y envía una captura por WhatsApp a tu admin.","image_url":"/images/howdy-guide-1.jpg"}
  ]'::jsonb,
  uses_direct_payment_notification = false
WHERE name = 'Howdy';
