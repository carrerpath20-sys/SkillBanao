# SkillBanao MVP (Landing-first Explore Flow)

This version follows a strict, professional flow:

1. **User first sees an eye-catching landing page** (`index.html`).
2. Clicking **Explore Platform** opens read-only preview mode (`explore.html`).
3. Full feature access is only after **Login** (`login.html`).

## Stage 1 ✅ (Future-safe Foundation)

- `.gitignore` added for env files/logs/build artifacts.
- `.env.example` added for deployment clarity.
- Runtime config injection pattern introduced for Supabase.

## Stage 2 ✅ (Backend-ready Auth + Data Wiring)

- Central API layer in `js/api.js` for auth/data operations.
- Local fallback mode retained when backend config is missing.
- Duplicate legacy auth entry removed.

## Stage 3 ✅ (Security + Production Readiness)

- Added input/output hardening utilities (`js/security.js`) and sanitized dashboard rendering to reduce XSS risk.
- Added stronger API validation for URLs and normalized auth emails.
- Added Supabase session hydration (`hydrateSessionFromSupabase`) so login/guard can reuse existing backend sessions.
- Added ready-to-run Supabase schema + RLS baseline in `supabase/schema.sql`.
- Added GitHub Actions CI syntax checks in `.github/workflows/ci.yml`.

### Runtime config injection (frontend-safe values only)

Inject before scripts:

```html
<script>
  window.__SKILLBANAO_CONFIG__ = {
    supabaseUrl: "https://YOUR_PROJECT.supabase.co",
    supabaseAnonKey: "YOUR_SUPABASE_ANON_KEY",
    googleClientId: "YOUR_GOOGLE_CLIENT_ID"
  };
</script>
```

- `googleClientId` can be exposed in frontend.
- `googleClientSecret` must stay server-side only.

### Supabase setup files

- Schema and policies: `supabase/schema.sql`

## Access Model

- **Public:** `index.html`, `explore.html`, `login.html`, `register.html`
- **Protected:** `creator-verification.html`, `course-upload.html`, `viewer-dashboard.html`, `payment.html`, `profile.html`

## Local Run

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173/index.html`
