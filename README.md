# SkillBanao MVP (Landing-first Explore Flow)

This version follows a strict, professional flow:

1. **User first sees an eye-catching landing page** (`index.html`).
2. Clicking **Explore Platform** opens read-only preview mode (`explore.html`).
3. Full feature access is only after **Login** (`login.html`).

## Step 1 (Future-safe Foundation) ✅

To avoid future deployment and security issues, this repository now uses a safer baseline:

- `.gitignore` added for env files, logs, build outputs, and editor artifacts.
- `.env.example` added so config expectations are explicit.
- `backend/supabaseClient.js` no longer stores real key placeholders in code logic.
- Supabase config must be injected at runtime via:

```html
<script>
  window.__SKILLBANAO_CONFIG__ = {
    supabaseUrl: "https://YOUR_PROJECT.supabase.co",
    supabaseAnonKey: "YOUR_SUPABASE_ANON_KEY"
  };
</script>
```

This keeps secrets/config out of committed code and reduces production mistakes.

## Access Model

- **Public:**
  - `index.html` (premium landing)
  - `explore.html` (read-only)
  - `login.html`
  - `register.html` (includes Google login placeholder)
- **Protected (login required):**
  - `creator-verification.html`
  - `course-upload.html`
  - `viewer-dashboard.html`
  - `payment.html`
  - `profile.html`

## JS Modules

- `js/session.js` → auth session storage
- `js/guard.js` → protected-route guard + logout
- `js/login.js` → login form logic
- `js/register.js` → register + Google placeholder action
- `js/state.js` → shared app state
- `js/upload.js`, `js/dashboard.js`, `js/creator.js`, `js/profile.js` → feature pages
- `backend/timeCreditService.js` → time-credit rules

## Local Run

```bash
python3 -m http.server 4173
```

Open:
- `http://localhost:4173/index.html`
