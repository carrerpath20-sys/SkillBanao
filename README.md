# SkillBanao MVP (Landing-first Explore Flow)

This version follows a strict, professional flow:

1. **User first sees an eye-catching landing page** (`index.html`).
2. Clicking **Explore Platform** opens read-only preview mode (`explore.html`).
3. Full feature access is only after **Login** (`login.html`).

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

## Google Login Placeholder

`register.html` has **Login with Google** button.
Later you can connect your OAuth/API key in `js/register.js`.

## Local Run

```bash
python3 -m http.server 4173
```

Open:
- `http://localhost:4173/index.html`
