import { getSupabaseClient } from "../backend/supabaseClient.js";

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

export async function signOutSession() {
  const client = getSupabaseClient();
  if (client) {
    await client.auth.signOut();
  }
  clearAuthSession();
}

export async function hydrateSessionFromSupabase() {
  const client = getSupabaseClient();
  if (!client) {
    return getAuthSession();
  }

  const { data, error } = await client.auth.getSession();
  if (error) {
    return getAuthSession();
  }

  const user = data.session?.user;
  if (!user) {
    const local = getAuthSession();
    if (local?.mode === "supabase") {
      clearAuthSession();
      return null;
    }
    return local;
  }

  setAuthSession({
    username: user.email || "user",
    provider: user.app_metadata?.provider || "password",
    mode: "supabase",
    userId: user.id
  });

  return getAuthSession();
}
