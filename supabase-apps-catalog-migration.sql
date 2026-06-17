-- ================================================================
  -- MIGRATION: apps_catalog + tutorials tables
  -- Run this in Supabase SQL Editor (Dashboard → SQL Editor)
  -- ================================================================

  -- 1. Apps Catalog table
  CREATE TABLE IF NOT EXISTS apps_catalog (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL UNIQUE,
    display_name text NOT NULL,
    ios_name text,
    description_es text,
    description_pt text,
    earnings_info_es text,
    earnings_info_pt text,
    color_hex text DEFAULT '#888888',
    color_hex_secondary text,
    icon_url text,
    download_url_android text,
    download_url_ios text,
    telegram_channel_url text,
    agency_code text,
    is_active boolean DEFAULT true,
    sort_order integer DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
  );

  ALTER TABLE apps_catalog ENABLE ROW LEVEL SECURITY;

  DROP POLICY IF EXISTS "Public can read active apps" ON apps_catalog;
  CREATE POLICY "Public can read active apps" ON apps_catalog FOR SELECT USING (is_active = true);

  DROP POLICY IF EXISTS "Admins can do everything" ON apps_catalog;
  CREATE POLICY "Admins can do everything" ON apps_catalog FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

  -- Seed with existing 3 apps
  INSERT INTO apps_catalog (name, display_name, ios_name, color_hex, color_hex_secondary,
    description_es, description_pt, earnings_info_es, earnings_info_pt,
    download_url_android, download_url_ios, telegram_channel_url, agency_code, sort_order)
  VALUES
  (
    'Waha', 'Waha', 'Liyo', '#06b6d4', '#67e8f9',
    'Plataforma con mensajes de texto, salas de audio grupales, videollamadas match y videollamadas privadas (todas opcionales).',
    'Plataforma com mensagens de texto, salas de áudio em grupo, videochamadas match e videochamadas privadas (todas opcionais).',
    'Mensajes VIP: 70 diamantes | Mensajes Free: 5 puntos | Videollamada Match VIP: 350 diamantes | Videollamada Privada: 700 diamantes/minuto | Meta mínima: 10,000 diamantes = $2.50 USD | Pago: martes a viernes.',
    'Mensagens VIP: 70 diamantes | Mensagens Free: 5 pontos | Videochamada Match VIP: 350 diamantes | Meta mínima: 10.000 diamantes = $2,50 USD | Pagamento: terça a sexta.',
    'https://play.google.com/store/apps/details?id=com.phx.waha',
    'https://apps.apple.com/us/app/liyo-emotions-find-echo/id6746777859?l=es-MX',
    'https://t.me/ingresos_waha', NULL, 1
  ),
  (
    'Layla', 'Layla', 'Nivi', '#ec4899', '#f9a8d4',
    'Mensajes, salas de audio, llamadas de voz y videollamadas (todas opcionales). Mayor ventaja: retiro ACUMULABLE desde $10 USD.',
    'Mensagens, salas de áudio, chamadas de voz e videochamadas (todas opcionais). Maior vantagem: retirada ACUMULÁVEL a partir de $10 USD.',
    'Mensajes: 90 monedas + 45 monedas ticket | Llamadas de voz: 1,350 monedas/minuto | 15,500 monedas = $1 USD | Meta diaria sugerida: 155,000 monedas = $10 USD.',
    'Mensagens: 90 moedas + 45 moedas ticket | Chamadas de voz: 1.350 moedas/minuto | 15.500 moedas = $1 USD | Meta diária: 155.000 moedas = $10 USD.',
    NULL, 'https://apps.apple.com/app/nivi', 'https://t.me/ingresos_layla', 'G-84Y3AG7HL', 2
  ),
  (
    'Howdy', 'Howdy', NULL, '#10b981', '#6ee7b7',
    'Usuarios principalmente de Asia, Europa y América del Norte. Live streaming, mensajes y match. Solo Android.',
    'Usuários principalmente da Ásia, Europa e América do Norte. Live streaming, mensagens e match. Apenas Android.',
    '100,000 puntos = $10 USD | Retiro mínimo: $10 USD (máximo 1 vez/semana) | Liquidación: Lunes 00:00 hora Beijing.',
    '100.000 pontos = $10 USD | Retirada mínima: $10 USD (máximo 1 vez/semana) | Liquidação: Segunda 00:00 horário de Pequim.',
    'https://api.wehowdy.com/api/v1/dl/android?bundleId=com.howdy.howdy',
    NULL, 'https://t.me/ingresos_howdy', 'R3DKXB5', 3
  )
  ON CONFLICT (name) DO NOTHING;

  -- 2. Tutorials table
  CREATE TABLE IF NOT EXISTS tutorials (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    description text,
    category text DEFAULT 'setup',
    duration text,
    level text DEFAULT 'beginner',
    image_url text,
    video_url text,
    app_name text,
    tags text[] DEFAULT '{}',
    is_active boolean DEFAULT true,
    sort_order integer DEFAULT 0,
    created_at timestamptz DEFAULT now()
  );

  ALTER TABLE tutorials ENABLE ROW LEVEL SECURITY;
  DROP POLICY IF EXISTS "Public read" ON tutorials;
  CREATE POLICY "Public read" ON tutorials FOR SELECT USING (is_active = true);
  DROP POLICY IF EXISTS "Admin all" ON tutorials;
  CREATE POLICY "Admin all" ON tutorials FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );
  