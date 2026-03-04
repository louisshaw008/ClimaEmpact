import { createBrowserRouter } from "react-router";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import ReportDetail from "./pages/ReportDetail";
import About from "./pages/About";
import Methodology from "./pages/Methodology";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "dashboard", Component: Dashboard },
      { path: "reports", Component: Reports },
      { path: "reports/:id", Component: ReportDetail },
      { path: "about", Component: About },
      { path: "methodology", Component: Methodology },
      { path: "*", Component: NotFound },
    ],
  },
]);
