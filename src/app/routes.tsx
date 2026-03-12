import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/landing-page";
import { Dashboard } from "./pages/dashboard";
import { SubscriptionFlowPage } from "./pages/subscription-flow";
import { CheckoutPage } from "./pages/checkout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/assinar/:planId",
    Component: SubscriptionFlowPage,
  },
  {
    path: "/checkout",
    Component: CheckoutPage,
  },
]);
