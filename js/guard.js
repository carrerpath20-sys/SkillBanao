import { clearAuthSession, hydrateSessionFromSupabase, isAuthenticated } from "./session.js";

async function enforceProtection() {
  await hydrateSessionFromSupabase();

  if (document.body.dataset.protected === "true" && !isAuthenticated()) {
    window.location.href = "login.html";
    return;
  }

  const logoutBtn = document.querySelector("#logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (event) => {
      event.preventDefault();
      clearAuthSession();
      window.location.href = "login.html";
    });
  }
}

enforceProtection();
