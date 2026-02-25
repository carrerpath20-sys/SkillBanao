import { hydrateSessionFromSupabase, isAuthenticated, signOutSession } from "./session.js";

async function enforceProtection() {
  await hydrateSessionFromSupabase();

  if (document.body.dataset.protected === "true" && !isAuthenticated()) {
    window.location.href = "login.html";
    return;
  }

  const logoutBtn = document.querySelector("#logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async (event) => {
      event.preventDefault();
      await signOutSession();
      window.location.href = "login.html";
    });
  }
}

enforceProtection();
