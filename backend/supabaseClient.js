export const supabaseConfig = {
  url: "https://YOUR_PROJECT.supabase.co",
  anonKey: "YOUR_SUPABASE_ANON_KEY"
};

export function getSupabaseClient() {
  if (!window.supabase) {
    console.warn("Supabase script not detected. Load @supabase/supabase-js via CDN first.");
    return null;
  }

  return window.supabase.createClient(supabaseConfig.url, supabaseConfig.anonKey);
}
