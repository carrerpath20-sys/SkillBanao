const AUTH_KEY = "skillbanao-auth-v1";

export function isAuthenticated() {
  return Boolean(localStorage.getItem(AUTH_KEY));
}

export function getAuthSession() {
  const raw = localStorage.getItem(AUTH_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    clearAuthSession();
    return null;
  }
}

export function setAuthSession(payload) {
  localStorage.setItem(AUTH_KEY, JSON.stringify({ ...payload, ts: Date.now() }));
}

export function clearAuthSession() {
  localStorage.removeItem(AUTH_KEY);
}
