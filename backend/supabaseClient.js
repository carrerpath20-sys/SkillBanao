const defaultConfig = {
  url: "",
  anonKey: "",
  googleClientId: ""
};

let warnedConfigMissing = false;
let warnedSdkMissing = false;

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
  return Boolean(resolveRuntimeConfig().googleClientId);
}

export function getSupabaseClient() {
  const config = resolveRuntimeConfig();

  if (!config.url || !config.anonKey) {
    if (!warnedConfigMissing) {
      console.warn(
        "Supabase config missing. Inject window.__SKILLBANAO_CONFIG__ with supabaseUrl and supabaseAnonKey."
      );
      warnedConfigMissing = true;
    }
    return null;
  }

  if (!window.supabase) {
    if (!warnedSdkMissing) {
      console.warn("Supabase script not detected. Load @supabase/supabase-js via CDN first.");
      warnedSdkMissing = true;
    }
    return null;
  }

  return window.supabase.createClient(config.url, config.anonKey);
}
