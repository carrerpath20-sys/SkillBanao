import { publishCourseToBackend } from "./api.js";
import { getState, setState } from "./state.js";

const form = document.querySelector("#course-form");
const status = document.querySelector("#course-status");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const state = getState();

  const course = {
    id: `course-${Date.now()}`,
    title: data.get("title"),
    description: data.get("description"),
    modules: Number(data.get("modules")),
    timeCost: Number(data.get("timeCost")),
    microPrice: Number(data.get("price")),
    video: data.get("video")
  };

  status.textContent = "Publishing course...";

  const result = await publishCourseToBackend(course);
  if (!result.ok) {
    status.textContent = result.message || "Failed to publish in backend; saved locally only.";
  }

  state.catalog.unshift(course);
  setState(state);
  status.textContent = `Published: ${course.title}. Visible on dashboard (${result.mode || "local"} mode).`;
  form.reset();
});
