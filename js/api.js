import { getSupabaseClient, hasGoogleOauthConfig } from "../backend/supabaseClient.js";
import { getAuthSession, setAuthSession } from "./session.js";
import { safeNumber } from "./security.js";
import { getState, setState } from "./state.js";

function getClient() {
  return getSupabaseClient();
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function isValidUrl(url) {
  try {
    const parsed = new URL(String(url || ""));
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

export async function loginWithPassword(username, password) {
  const client = getClient();

  if (!client) {
    setAuthSession({ username, provider: "password", mode: "local" });
    return { ok: true, mode: "local" };
  }

  const { data, error } = await client.auth.signInWithPassword({
    email: normalizeEmail(username),
    password
  });

  if (error) {
    return { ok: false, message: error.message };
  }

  setAuthSession({
    username: data.user?.email || username,
    provider: "password",
    mode: "supabase",
    userId: data.user?.id || null
  });
  return { ok: true, mode: "supabase" };
}

export async function registerWithPassword(name, email, password) {
  const client = getClient();

  if (!client) {
    return { ok: true, mode: "local", message: "Registration saved locally. Please login to continue." };
  }

  const { error } = await client.auth.signUp({
    email: normalizeEmail(email),
    password,
    options: {
      data: { full_name: String(name || "").trim() }
    }
  });

  if (error) {
    return { ok: false, message: error.message };
  }

  return {
    ok: true,
    mode: "supabase",
    message: "Registration successful. Verify email (if enabled) then login."
  };
}

export async function loginWithGoogle() {
  const client = getClient();

  if (!client) {
    return {
      ok: false,
      message: "Google login placeholder active. Add runtime Supabase config + OAuth credentials first."
    };
  }

  if (!hasGoogleOauthConfig()) {
    return {
      ok: false,
      message: "Missing googleClientId in runtime config. Add it before starting Google OAuth."
    };
  }

  const { error } = await client.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin + "/viewer-dashboard.html"
    }
  });

  if (error) {
    return { ok: false, message: error.message };
  }

  return { ok: true, message: "Redirecting to Google OAuth..." };
}

export async function syncCatalogFromBackend() {
  const client = getClient();
  if (!client) {
    return;
  }

  const { data, error } = await client
    .from("courses")
    .select("id,title,description,module_count,time_cost,micro_price,video_url")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return;
  }

  const state = getState();
  state.catalog = data.map((course) => ({
    id: course.id,
    title: course.title,
    description: course.description,
    modules: safeNumber(course.module_count, 0),
    timeCost: safeNumber(course.time_cost, 0),
    microPrice: safeNumber(course.micro_price, 0),
    video: course.video_url || ""
  }));
  setState(state);
}

export async function publishCourseToBackend(course) {
  const client = getClient();

  if (!isValidUrl(course.video)) {
    return { ok: false, message: "Course video URL must be a valid http/https URL." };
  }

  if (!client) {
    return { ok: true, mode: "local" };
  }

  const session = getAuthSession();
  const payload = {
    creator_id: session?.userId || null,
    title: String(course.title || "").trim(),
    description: String(course.description || "").trim(),
    module_count: safeNumber(course.modules, 0),
    time_cost: safeNumber(course.timeCost, 0),
    micro_price: safeNumber(course.microPrice, 0),
    video_url: course.video,
    is_active: true
  };

  const { error } = await client.from("courses").insert(payload);
  if (error) {
    return { ok: false, message: error.message };
  }

  return { ok: true, mode: "supabase" };
}

export async function submitVerificationToBackend(record) {
  const client = getClient();

  const urls = [record.cv, record.certificate, record.demoVideo];
  if (!urls.every(isValidUrl)) {
    return { ok: false, message: "CV, certificate and demo video must be valid URLs." };
  }

  if (!client) {
    return { ok: true, mode: "local" };
  }

  const session = getAuthSession();
  const { error } = await client.from("creator_verifications").insert({
    user_id: session?.userId || null,
    full_name: String(record.name || "").trim(),
    cv_url: record.cv,
    certificate_url: record.certificate,
    demo_video_url: record.demoVideo,
    status: "pending"
  });

  if (error) {
    return { ok: false, message: error.message };
  }

  return { ok: true, mode: "supabase" };
}
