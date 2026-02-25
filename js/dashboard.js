import { enrollInCourse, consumeTimeForUnlock, completeModule } from "../backend/timeCreditService.js";
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

  ui.timeBalance.textContent = state.timeBalance;
  ui.skillPoints.textContent = state.skillPoints;
  ui.activeCourses.textContent = state.activeCourses.length;

  ui.catalogList.innerHTML = state.catalog
    .map(
      (course) => `<li>
        <strong>${course.title}</strong>
        <p>${course.description}</p>
        <p>${course.modules} modules • ${course.timeCost} credits • $${course.microPrice}</p>
        <button class="btn secondary" data-enroll="${course.id}">Enroll with Time Credits</button>
      </li>`
    )
    .join("");

  ui.activeList.innerHTML = state.activeCourses
    .map(
      (course) => `<li>
        <strong>${course.title}</strong>
        <p>Unlocked ${course.unlockedModules}/${course.modules} • Completed ${course.completedModules}/${course.modules}</p>
        <p class="${course.nextUnlockInHours <= 12 ? "expiring" : ""}">Next module unlocks in ${course.nextUnlockInHours}h</p>
        <button class="btn secondary" data-complete="${course.id}">Mark Module Complete</button>
      </li>`
    )
    .join("");

  ui.fomoMessage.textContent = state.activeCourses.length
    ? "⏳ Next module unlocks tomorrow — spend credits now to maintain streak momentum."
    : "Start a course to activate your learning streak.";
}

document.querySelector("#buy-credits").addEventListener("click", () => {
  const state = getState();
  state.timeBalance += 5;
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
    course.nextUnlockInHours = Math.max(0, course.nextUnlockInHours - 1);
  });
  setState(state);
  render();
}, 15000);

render();
