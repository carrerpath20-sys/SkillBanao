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

Stage 2 starts backend integration without breaking local fallback mode:

- New `js/api.js` service layer:
  - password login/register (Supabase if configured; local fallback otherwise)
  - Google OAuth start (Supabase OAuth flow)
  - course catalog sync from Supabase
  - course publish + creator verification submission to Supabase
- `js/login.js`, `js/register.js`, `js/upload.js`, `js/creator.js`, `js/dashboard.js` now use the API layer
- duplicated legacy `js/auth.js` removed to avoid split auth logic

### Runtime config injection

Inject before scripts (or in a shared head include):

```html
<script>
  window.__SKILLBANAO_CONFIG__ = {
    supabaseUrl: "https://YOUR_PROJECT.supabase.co",
    supabaseAnonKey: "YOUR_SUPABASE_ANON_KEY"
  };
</script>
```

### Recommended Supabase tables for Stage 2

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
