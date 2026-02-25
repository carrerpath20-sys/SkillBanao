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

## Stage 3 ✅ (Conflict Resolution + Security + Prod Readiness)

The main integration-conflict files were normalized:

- `README.md`
- `backend/supabaseClient.js`
- `js/creator.js`
- `js/dashboard.js`
- `js/guard.js`
- `js/login.js`
- `js/register.js`
- `js/session.js`
- `js/upload.js`

What was resolved:

- Unified session flow between local fallback and Supabase session hydration.
- Unified logout path (`signOutSession`) with Supabase-aware sign-out.
- Unified auth/register handlers with null-safe DOM bindings.
- Unified validation/sanitization behavior in upload, verification, and dashboard rendering.
- Reduced console warning noise in Supabase client with one-time warnings.

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
