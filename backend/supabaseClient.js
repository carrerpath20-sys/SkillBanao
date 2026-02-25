const defaultConfig = {
  url: "",
  anonKey: "",
  googleClientId: ""
};

function resolveRuntimeConfig() {
  const injected = window.__SKILLBANAO_CONFIG__ || {};

  return {
    url: injected.supabaseUrl || defaultConfig.url,
    anonKey: injected.supabaseAnonKey || defaultConfig.anonKey,
    googleClientId: injected.googleClientId || defaultConfig.googleClientId
  };
}

export function getSupabaseConfig() {
  return resolveRuntimeConfig();
}

export function hasGoogleOauthConfig() {
  const config = resolveRuntimeConfig();
  return Boolean(config.googleClientId);
}

export function getSupabaseClient() {
  const config = resolveRuntimeConfig();

  if (!config.url || !config.anonKey) {
    console.warn(
      "Supabase config missing. Inject window.__SKILLBANAO_CONFIG__ with supabaseUrl and supabaseAnonKey."
    );
    return null;
  }

  if (!window.supabase) {
    console.warn("Supabase script not detected. Load @supabase/supabase-js via CDN first.");
    return null;
  }

  return window.supabase.createClient(config.url, config.anonKey);
}
