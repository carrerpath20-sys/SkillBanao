import { addAchievement } from "../js/state.js";

export function enrollInCourse(state, courseId) {
  const selected = state.catalog.find((course) => course.id === courseId);
  if (!selected) {
    return { ok: false, message: "Course not found." };
  }

  if (state.activeCourses.some((course) => course.id === courseId)) {
    return { ok: false, message: "Already enrolled in this course." };
  }

  if (state.timeBalance < selected.timeCost) {
    return { ok: false, message: "Not enough time credits." };
  }

  state.timeBalance -= selected.timeCost;
  state.activeCourses.push({ ...selected, unlockedModules: 1, completedModules: 0, nextUnlockInHours: 24 });
  return { ok: true, message: `Enrolled in ${selected.title}. Module 1 unlocked.` };
}

export function consumeTimeForUnlock(state, amount = 2) {
  if (state.activeCourses.length === 0 || state.timeBalance < amount) {
    return { ok: false, message: "Unable to spend time credits right now." };
  }

  const course = state.activeCourses[0];
  if (course.unlockedModules >= course.modules) {
    return { ok: false, message: "All modules already unlocked." };
  }

  state.timeBalance -= amount;
  course.unlockedModules += 1;
  course.nextUnlockInHours = 24;
  return { ok: true, message: `Early unlock successful. Module ${course.unlockedModules} is now open.` };
}

export function completeModule(state, courseId) {
  const course = state.activeCourses.find((item) => item.id === courseId);
  if (!course) {
    return { ok: false, message: "No active course found." };
  }

  if (course.completedModules >= course.unlockedModules) {
    return { ok: false, message: "Unlock next module first." };
  }

  course.completedModules += 1;
  state.skillPoints += 10;

  if (course.completedModules === course.modules) {
    state.timeBalance += 4;
    addAchievement(state, `Completed ${course.title}`);
    return { ok: true, message: "Course completed. Rewards added to your profile." };
  }

  return { ok: true, message: `Module ${course.completedModules} completed.` };
}
