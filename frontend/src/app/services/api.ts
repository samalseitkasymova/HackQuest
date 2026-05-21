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
    request("/auth/register", { method: "POST", body: JSON.stringify({ username, email, password }) }),
  login: (email: string, password: string) =>
    request("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  leaderboard: () => request("/leaderboard"),
  saveScore: (userId: number, username: string, gameName: string, points: number) =>
    request("/scores", { method: "POST", body: JSON.stringify({ userId, username, gameName, points }) }),
};

export function saveUser(user: User) { localStorage.setItem("hq_user", JSON.stringify(user)); }
export function getUser(): User | null {
  const raw = localStorage.getItem("hq_user");
  return raw ? JSON.parse(raw) : null;
}
export function logout() { localStorage.removeItem("hq_user"); }
