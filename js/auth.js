import { isAuthenticated, setAuthSession } from "./session.js";

const status = document.querySelector("#auth-status");
const loginTab = document.querySelector("#login-tab");
const registerTab = document.querySelector("#register-tab");

if (isAuthenticated()) {
  window.location.href = "viewer-dashboard.html";
}

document.querySelectorAll("[data-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    const isLogin = button.dataset.tab === "login";
    loginTab.classList.toggle("active", isLogin);
    registerTab.classList.toggle("active", !isLogin);
  });
});

document.querySelector("#login-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.target);
  const username = String(data.get("username") || "").trim();
  const password = String(data.get("password") || "").trim();

  if (!username || !password) {
    status.textContent = "Username and password are required.";
    return;
  }

  setAuthSession({ username, provider: "password" });
  status.textContent = "Login successful. Redirecting...";
  setTimeout(() => {
    window.location.href = "viewer-dashboard.html";
  }, 400);
});

document.querySelector("#register-form").addEventListener("submit", (event) => {
  event.preventDefault();
  status.textContent = "Registration completed locally. You can now login.";
  loginTab.classList.add("active");
  registerTab.classList.remove("active");
});

document.querySelector("#google-login").addEventListener("click", () => {
  status.textContent = "Google login placeholder ready. Add your OAuth API key later.";
});
