import { clearAuthSession, isAuthenticated } from "./session.js";

if (document.body.dataset.protected === "true" && !isAuthenticated()) {
  window.location.href = "login.html";
}

const logoutBtn = document.querySelector("#logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", (event) => {
    event.preventDefault();
    clearAuthSession();
    window.location.href = "login.html";
  });
}
