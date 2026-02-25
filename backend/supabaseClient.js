const defaultConfig = {
  url: "",
  anonKey: ""
};

function resolveRuntimeConfig() {
  const injected = window.__SKILLBANAO_CONFIG__ || {};

  return {
    url: injected.supabaseUrl || defaultConfig.url,
    anonKey: injected.supabaseAnonKey || defaultConfig.anonKey
  };
}

export function getSupabaseConfig() {
  return resolveRuntimeConfig();
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
