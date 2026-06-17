# Sirens Stream — Eclipse Angels Agency

Plataforma interna de gestión para la agencia de streamers Eclipse Angels. Permite a streamers ver su nómina, canales, ranking y perfil; a agentes gestionar sus chicas; y a admins controlarlo todo.

## Estado actual del proyecto

**La app corre localmente en Replit y está conectada al Supabase de producción.**
El repo original de GitHub sigue desplegado en Render (no tocar). Este workspace es para desarrollo y nuevas features.

---

## Run & Operate

```bash
# Arrancar el API server (puerto auto-asignado por Replit, ~8080)
pnpm --filter @workspace/api-server run dev

# Arrancar el frontend (puerto auto-asignado por Replit, ~21933)
pnpm --filter @workspace/sirens-stream run dev

# Typecheck frontend
pnpm --filter @workspace/sirens-stream run typecheck

# Typecheck backend
pnpm --filter @workspace/api-server run typecheck

# Instalar dependencias
pnpm install
```

Los workflows de Replit arrancan automáticamente:
- `artifacts/api-server: API Server` — backend Express
- `artifacts/sirens-stream: web` — frontend Vite

---

## Stack

- **Monorepo**: pnpm workspaces, Node.js 24, TypeScript
- **Frontend**: React 19 + Vite + TailwindCSS v4 + Wouter (routing)
- **Backend**: Express 5 + esbuild (bundle) + pino (logging)
- **DB**: Supabase (PostgreSQL) — acceso directo via fetch() al REST API con service role key
- **Auth**: Supabase Auth (cliente en frontend, validación en backend via service role)
- **Push**: web-push (VAPID)
- **Build backend**: esbuild via `build.mjs` → `dist/index.mjs`

**NO usa**: Drizzle ORM, @workspace/db, @workspace/api-zod, api-client-react. El backend llama directamente al REST API de Supabase.

---

## Credenciales y secrets

Todos guardados como **environment secrets de Replit** (nunca en código):

| Variable | Uso |
|---|---|
| `SUPABASE_URL` | URL del proyecto Supabase (backend) |
| `SUPABASE_SERVICE_ROLE_KEY` | Clave service role (backend, bypass RLS) |
| `VITE_SUPABASE_URL` | URL del proyecto Supabase (frontend) |
| `VITE_SUPABASE_ANON_KEY` | Clave anon (frontend) |
| `GROQ_API_KEY` | Para el chat IA |
| `VITE_GROQ_API_KEY` | Para el chat IA (frontend directo) |
| `VAPID_PUBLIC_KEY` / `VAPID_PRIVATE_KEY` / `VAPID_SUBJECT` | Push notifications (backend) |
| `VITE_VAPID_PUBLIC_KEY` | Push (frontend) |
| `GITHUB_TOKEN` | Para pushes al repo de GitHub |
| `SESSION_SECRET` | Secret de sesión |

Los `.env` locales en `artifacts/api-server/.env` y `artifacts/sirens-stream/.env` tienen copias para desarrollo local en Replit. **NO commitear esos archivos.**

### Repo original en GitHub
- Clonado en `/home/runner/workspace/sirens-repo`
- Git configurado con token para pushes
- El deploy en Render apunta al repo original — **no modificar eso directamente**

---

## Arquitectura / Donde viven las cosas

```
artifacts/
  api-server/          — Backend Express
    src/
      app.ts           — Express app setup (cors, pino, rutas)
      index.ts         — Entry point (lee PORT del env)
      routes/
        index.ts       — Router principal (registra todos los sub-routers)
        health.ts      — GET /api/healthz
        apps-catalog.ts — GET/POST/PATCH/DELETE /api/apps-catalog (NUEVO)
        channels.ts    — Canal access, mensajes, grant-channels
        chat.ts        — Chat IA con Groq
        stats.ts       — Estadísticas públicas
        tutorials.ts   — Tutoriales
        push.ts        — Suscripciones push
        nomina-state.ts — Estado de nómina por app
        agent-commissions.ts
        agent-commissions-admin.ts
        agent-workers.ts
        cierre-semanal.ts — Cerrar semana de pagos
        colider.ts
        create-agent.ts
        custom-worker-rates.ts
        in-app-notifications.ts
        payment-confirmations.ts
        payment-method-lock.ts
        admin-paid-marks.ts
        admin-pagos.ts
        admin-users.ts
        profile.ts
        publish.ts
        ranking.ts
        site-settings.ts
        telegram.ts
        worker-entries.ts
      lib/
        logger.ts      — Pino logger singleton
        push-dispatch.ts — Helpers para enviar push
        telegram-dispatch.ts
    build.mjs          — Script esbuild (bundle a dist/index.mjs)

  sirens-stream/       — Frontend React
    src/
      pages/           — Páginas principales
        home.tsx       — Landing pública
        login.tsx      — Login/registro
        perfil.tsx     — Perfil de la streamer
        admin.tsx      — Panel de admin (3500+ líneas, muy complejo)
        agente.tsx     — Panel del agente
        colider.tsx    — Panel del co-líder
        nomina.tsx     — Ver nómina (admin/agente)
        ranking.tsx    — Ranking de streamers
        apps.tsx       — Info de apps disponibles
        canales.tsx    — Canales de comunicados
        salarios.tsx   — Ver salarios publicados
        rendimiento.tsx
        pagos.tsx
        tutorials/     — Tutoriales
        ... (más páginas públicas)
      contexts/
        AuthContext.tsx — Contexto de autenticación Supabase
      lib/
        supabase.ts    — Cliente Supabase + tipos + COUNTRIES + helpers
        push.ts        — Helper para suscripción push
      components/
        layout/        — Header, Footer, FloatingSocials, PushNotificationCard
        ui/            — Componentes shadcn/ui
      App.tsx          — Router Wouter con todas las rutas
```

---

## Routing

El proxy de Replit enruta:
- `/api/*` → `artifacts/api-server` (puerto ~8080)
- `/` → `artifacts/sirens-stream` (puerto ~21933)

En el frontend: `VITE_API_URL` está **vacío** en local (el proxy maneja `/api`). En producción Render: `https://eclipse-angels-api.onrender.com`.

---

## Base de datos (Supabase)

Tablas principales:
- `profiles` — Usuarios (is_admin, is_agent, is_colider, agent_code, etc.)
- `worker_entries` — Streamers registradas (app_name, metodo_pago, etc.)
- `nomina_history` — Historial de nóminas subidas
- `published_salaries` — Salarios publicados por semana
- `agent_commissions` — Comisiones de agentes
- `agent_payment_confirmations`
- `channel_messages` / `channel_requests` — Sistema de canales
- `push_subscriptions` — Suscripciones push
- `in_app_notifications`
- `site_settings` — Config dinámica (show_agencia, etc.)
- `custom_worker_rates` — Tasas personalizadas por streamer
- `apps_catalog` — **NUEVA TABLA (pendiente crear en Supabase)** — catálogo dinámico de apps

### apps_catalog (SQL a ejecutar en Supabase)
```sql
CREATE TABLE IF NOT EXISTS apps_catalog (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL UNIQUE,
  logo_url    TEXT,
  active      BOOLEAN NOT NULL DEFAULT true,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO apps_catalog (name, active, order_index) VALUES
  ('Waha', true, 0),
  ('Layla', true, 1),
  ('Howdy', true, 2)
ON CONFLICT (name) DO NOTHING;
```

---

## Feature pendiente: Apps Catalog Dinámico

**Qué es**: Reemplazar todos los arrays hardcodeados `['Waha', 'Layla', 'Howdy']` con datos dinámicos desde la tabla `apps_catalog`.

**Backend**: Ya creado — `artifacts/api-server/src/routes/apps-catalog.ts`
- `GET /api/apps-catalog` — lista apps con fallback a hardcoded si la tabla no existe
- `GET /api/apps-catalog/names` — solo los nombres
- `POST/PATCH/DELETE /api/apps-catalog/:id` — CRUD

**Frontend pendiente**:
- `admin.tsx` — Ya tiene estado `catalogApps` dinámico, ya carga desde `/api/apps-catalog/names`. Falta: sección admin para CRUD de apps
- `channels.ts` (backend) — `ALL_APPS` y `grant-agent-channels` aún hardcodeados
- `nomina-state.ts` (backend) — validación `['Waha','Layla','Howdy'].includes()` aún hardcodeada
- `stats.ts` (backend) — `platforms` aún hardcodeada
- Páginas frontend: `ranking.tsx`, `nomina.tsx`, `perfil.tsx`, `apps.tsx` — cargar apps desde API

---

## Bugs conocidos / ya corregidos

| Bug | Estado |
|---|---|
| `admin.tsx` — `const COUNTRIES` duplicado (TS2395) | ✅ Corregido |
| `admin.tsx` — `const APPS` hardcodeado | ✅ Reemplazado por estado dinámico `catalogApps` |
| `admin.tsx` — `setCierreMsg('')` type mismatch | ⏳ Pendiente |
| `admin.tsx` — `doCierre` no definida | ⏳ Pendiente |
| `admin.tsx` — funciones duplicadas `fetchAgentPayData` y `fetchLaylaDirectNotifs` | ⏳ Pendiente |
| `admin.tsx` — `d.agent_user_id` debe ser `d.agentRow.agent_user_id` | ⏳ Pendiente |
| `agente.tsx` — `setWorkersByApp`/`setAllWorkerCards` no existen (son memos) | ⏳ Pendiente |
| `apps.tsx` — `title` no definida en `GuideModal` | ⏳ Pendiente |
| `home.tsx` — `appIcons` no en tipo de slide | ⏳ Pendiente |
| `perfil.tsx` — `style` prop no en `FInput` | ⏳ Pendiente |
| `customRateApp` type mismatch | ⏳ Pendiente |

---

## Gotchas importantes

- **NUNCA** usar `pnpm run dev` en la raíz — usar los workflows de Replit
- **NUNCA** llamar a puertos directamente (ej: `localhost:8080`) — siempre `localhost:80/api/...`
- El backend usa **`--env-file=.env`** para cargar credenciales en dev (no `dotenv`)
- El backend usa `req.log` (pino-http) para logging, nunca `console.log`
- `VITE_API_URL` debe estar **vacío** en Replit local (el proxy enruta `/api` automáticamente)
- La tabla `apps_catalog` **aún no existe en Supabase** — el endpoint tiene fallback hardcodeado
- `admin.tsx` tiene 3500+ líneas — es el archivo más complejo del proyecto

---

## Workflow Git

```bash
# Pushear al repo de GitHub (desde /home/runner/workspace/sirens-repo)
cd /home/runner/workspace/sirens-repo
git add -A
git commit -m "descripción"
git push origin main
```

El token está en `GITHUB_TOKEN` env var.

---

## User preferences

- Comunicación en español
- Primero probar localmente en Replit antes de pushear a GitHub
- No romper el deploy en Render (repo original intacto)
- Quiere que los nombres de apps (Waha/Layla/Howdy) sean dinámicos desde la BD
