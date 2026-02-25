import { publishCourseToBackend } from "./api.js";
import { getState, setState } from "./state.js";

const form = document.querySelector("#course-form");
const status = document.querySelector("#course-status");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const state = getState();

    const course = {
      id: `course-${Date.now()}`,
      title: String(data.get("title") || "").trim(),
      description: String(data.get("description") || "").trim(),
      modules: Number(data.get("modules")),
      timeCost: Number(data.get("timeCost")),
      microPrice: Number(data.get("price")),
      video: String(data.get("video") || "").trim()
    };

    status.textContent = "Publishing course...";

    const result = await publishCourseToBackend(course);
    if (!result.ok) {
      status.textContent = result.message || "Failed to publish in backend; saved locally only.";
      return;
    }

    state.catalog.unshift(course);
    setState(state);
    status.textContent = `Published: ${course.title}. Visible on dashboard (${result.mode || "local"} mode).`;
    form.reset();
  });
}
