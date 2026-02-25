const STORAGE_KEY = "skillbanao-state-v2";

const demoCourse = {
  id: "course-demo-1",
  title: "Portfolio Mastery for Creators",
  description: "Build authority and client trust with premium case-study storytelling.",
  modules: 6,
  timeCost: 8,
  microPrice: 3,
  video: "https://example.com/demo"
};

const defaultState = {
  timeBalance: 12,
  skillPoints: 0,
  achievements: [],
  catalog: [demoCourse],
  activeCourses: []
};

export function getState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return structuredClone(defaultState);
  }

  try {
    const parsed = JSON.parse(saved);
    return { ...structuredClone(defaultState), ...parsed };
  } catch {
    return structuredClone(defaultState);
  }
}

export function setState(nextState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
}

export function addAchievement(state, text) {
  if (!state.achievements.includes(text)) {
    state.achievements.push(text);
  }
}
