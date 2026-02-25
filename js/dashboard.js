import { enrollInCourse, consumeTimeForUnlock, completeModule } from "../backend/timeCreditService.js";
import { syncCatalogFromBackend } from "./api.js";
import { escapeHtml, safeNumber } from "./security.js";
import { getState, setState } from "./state.js";

const ui = {
  timeBalance: document.querySelector("#time-balance"),
  skillPoints: document.querySelector("#skill-points"),
  activeCourses: document.querySelector("#active-courses"),
  fomoMessage: document.querySelector("#fomo-message"),
  catalogList: document.querySelector("#catalog-list"),
  activeList: document.querySelector("#active-list")
};

function render() {
  const state = getState();

  ui.timeBalance.textContent = safeNumber(state.timeBalance, 0);
  ui.skillPoints.textContent = safeNumber(state.skillPoints, 0);
  ui.activeCourses.textContent = state.activeCourses.length;

  ui.catalogList.innerHTML = state.catalog
    .map((course) => {
      const title = escapeHtml(course.title);
      const description = escapeHtml(course.description);
      const modules = safeNumber(course.modules, 0);
      const timeCost = safeNumber(course.timeCost, 0);
      const microPrice = safeNumber(course.microPrice, 0);
      const id = escapeHtml(course.id);

      return `<li>
        <strong>${title}</strong>
        <p>${description}</p>
        <p>${modules} modules • ${timeCost} credits • $${microPrice}</p>
        <button class="btn secondary" data-enroll="${id}">Enroll with Time Credits</button>
      </li>`;
    })
    .join("");

  ui.activeList.innerHTML = state.activeCourses
    .map((course) => {
      const title = escapeHtml(course.title);
      const unlocked = safeNumber(course.unlockedModules, 0);
      const completed = safeNumber(course.completedModules, 0);
      const total = safeNumber(course.modules, 0);
      const nextUnlockInHours = safeNumber(course.nextUnlockInHours, 0);
      const id = escapeHtml(course.id);

      return `<li>
        <strong>${title}</strong>
        <p>Unlocked ${unlocked}/${total} • Completed ${completed}/${total}</p>
        <p class="${nextUnlockInHours <= 12 ? "expiring" : ""}">Next module unlocks in ${nextUnlockInHours}h</p>
        <button class="btn secondary" data-complete="${id}">Mark Module Complete</button>
      </li>`;
    })
    .join("");

  ui.fomoMessage.textContent = state.activeCourses.length
    ? "⏳ Next module unlocks tomorrow — spend credits now to maintain streak momentum."
    : "Start a course to activate your learning streak.";
}

document.querySelector("#buy-credits").addEventListener("click", () => {
  const state = getState();
  state.timeBalance = safeNumber(state.timeBalance, 0) + 5;
  setState(state);
  ui.fomoMessage.textContent = "Micro-payment success in sandbox mode. +5 credits added.";
  render();
});

document.querySelector("#use-time").addEventListener("click", () => {
  const state = getState();
  const result = consumeTimeForUnlock(state, 2);
  setState(state);
  ui.fomoMessage.textContent = result.message;
  render();
});

ui.catalogList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-enroll]");
  if (!button) return;
  const state = getState();
  const result = enrollInCourse(state, button.dataset.enroll);
  setState(state);
  ui.fomoMessage.textContent = result.message;
  render();
});

ui.activeList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-complete]");
  if (!button) return;
  const state = getState();
  const result = completeModule(state, button.dataset.complete);
  setState(state);
  ui.fomoMessage.textContent = result.message;
  render();
});

setInterval(() => {
  const state = getState();
  state.activeCourses.forEach((course) => {
    course.nextUnlockInHours = Math.max(0, safeNumber(course.nextUnlockInHours, 0) - 1);
  });
  setState(state);
  render();
}, 15000);

async function init() {
  await syncCatalogFromBackend();
  render();
}

init();
