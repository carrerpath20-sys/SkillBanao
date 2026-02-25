import { getState } from "./state.js";

const state = getState();
const total = state.activeCourses.reduce((acc, c) => acc + c.modules, 0);
const done = state.activeCourses.reduce((acc, c) => acc + c.completedModules, 0);
const progress = total ? Math.round((done / total) * 100) : 0;

document.querySelector("#achievement-count").textContent = state.achievements.length;
document.querySelector("#progress-bar").value = progress;
document.querySelector("#badges").innerHTML = state.achievements.length
  ? state.achievements.map((text) => `<span class="badge">🏅 ${text}</span>`).join("")
  : "<span class='badge'>No badges yet. Complete your first course.</span>";
