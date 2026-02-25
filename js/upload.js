import { getState, setState } from "./state.js";

const form = document.querySelector("#course-form");
const status = document.querySelector("#course-status");

form.addEventListener("submit", (event) => {
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

  state.catalog.unshift(course);
  setState(state);
  status.textContent = `Published: ${course.title}. It is now visible on the viewer dashboard.`;
  form.reset();
});
