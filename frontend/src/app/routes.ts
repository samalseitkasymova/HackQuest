import { createBrowserRouter } from "react-router";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Testing from "./pages/Testing";
import Lab from "./pages/Lab";
import Leaderboard from "./pages/Leaderboard";
import Missions from "./pages/Missions";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./components/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  { path: "/login", Component: Login },
  { path: "/register", Component: Register },
  {
    path: "/app",
    Component: DashboardLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "testing", Component: Testing },
      { path: "lab", Component: Lab },
      { path: "leaderboard", Component: Leaderboard },
      { path: "missions", Component: Missions },
      { path: "profile", Component: Profile },
      { path: "admin", Component: Admin },
    ],
  },
]);