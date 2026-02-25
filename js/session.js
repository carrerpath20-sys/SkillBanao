const AUTH_KEY = "skillbanao-auth-v1";

export function isAuthenticated() {
  return Boolean(localStorage.getItem(AUTH_KEY));
}

export function setAuthSession(payload) {
  localStorage.setItem(AUTH_KEY, JSON.stringify({ ...payload, ts: Date.now() }));
}

export function clearAuthSession() {
  localStorage.removeItem(AUTH_KEY);
}
