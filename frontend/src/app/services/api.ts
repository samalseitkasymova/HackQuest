const API_URL = "http://localhost:8080/api";

export type User = {
  id: number;
  username: string;
  email: string;
  role: string;
  points: number;
  level: number;
};

async function request(path: string, options: RequestInit = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) throw new Error(data?.message || "Ошибка сервера");
  return data;
}

export const api = {
  register: (username: string, email: string, password: string) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
    }),

  login: (email: string, password: string) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

    submitLab: (id: number, payload: string) =>
  request(`/labs/${id}/submit`, {
    method: "POST",
    body: JSON.stringify({ payload }),
  }),

  getUserById: (id: number) =>
    request(`/users/${id}`),

  leaderboard: () =>
    request("/leaderboard"),

  saveScore: (
    userId: number,
    username: string,
    gameName: string,
    points: number
  ) =>
    request("/scores", {
      method: "POST",
      body: JSON.stringify({
        userId,
        username,
        gameName,
        points,
      }),
    }),

    getMissions: () => request("/missions"),

createMission: (mission: any) =>
  request("/missions", {
    method: "POST",
    body: JSON.stringify(mission),
  }),

deleteMission: (id: number) =>
  request(`/missions/${id}`, {
    method: "DELETE",
  }),

  // ===== QUESTIONS =====

  getQuestions: () =>
    request("/questions"),

  createQuestion: (question: any) =>
    request("/questions", {
      method: "POST",
      body: JSON.stringify(question),
    }),

  updateQuestion: (id: number, question: any) =>
    request(`/questions/${id}`, {
      method: "PUT",
      body: JSON.stringify(question),
    }),

  deleteQuestion: (id: number) =>
    request(`/questions/${id}`, {
      method: "DELETE",
    }),

  // ===== USERS =====

  getAllUsers: () =>
    request("/users/all"),

  makeAdmin: (id: number) =>
    request(`/users/${id}/role?role=ADMIN`, {
      method: "PUT",
    }),

  makePlayer: (id: number) =>
    request(`/users/${id}/role?role=PLAYER`, {
      method: "PUT",
    }),

  deleteUser: (id: number) =>
    request(`/users/${id}`, {
      method: "DELETE",
    }),

    getLeaderboard: () =>
  request("/users/leaderboard"),

    getUserAchievements: (userId: number) =>
  request(`/achievements/user/${userId}`),

    // Labs
getLabs: () =>
  request("/labs"),

getLabById: (id: number) =>
  request(`/labs/${id}`),

createLab: (lab: any) =>
  request("/labs/admin", {
    method: "POST",
    body: JSON.stringify(lab),
  }),

updateLab: (id: number, lab: any) =>
  request(`/labs/admin/${id}`, {
    method: "PUT",
    body: JSON.stringify(lab),
  }),

  getUserLabAttempts: (userId: number) =>
  request(`/lab-attempts/user/${userId}`),

deleteLab: (id: number) =>
  request(`/labs/admin/${id}`, {
    method: "DELETE",
  }),
};

export function saveUser(user: User) { localStorage.setItem("hq_user", JSON.stringify(user)); }
export function getUser(): User | null {
  const raw = localStorage.getItem("hq_user");
  return raw ? JSON.parse(raw) : null;
}
export function logout() { localStorage.removeItem("hq_user"); }

