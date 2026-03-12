import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/landing-page";
import { Dashboard } from "./pages/dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
]);
