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

## Stage 3 ✅ (Google OAuth readiness hardening)

- Google OAuth now validates runtime config before starting flow.
- Added explicit env placeholders for Google OAuth values.
- Security rule: **Never expose Google client secret in frontend code**.

> Important: If a client secret was shared publicly, rotate it immediately from Google Cloud Console.

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

### Recommended Supabase tables

- `courses(id,title,description,module_count,time_cost,micro_price,video_url,is_active,created_at)`
- `creator_verifications(user_id,full_name,cv_url,certificate_url,demo_video_url,status,created_at)`

## Access Model

- **Public:** `index.html`, `explore.html`, `login.html`, `register.html`
- **Protected:** `creator-verification.html`, `course-upload.html`, `viewer-dashboard.html`, `payment.html`, `profile.html`

## Local Run

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173/index.html`
