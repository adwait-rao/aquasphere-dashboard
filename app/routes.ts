import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  ...prefix("dashboard", [
    layout("routes/dashboard/layout.tsx", [
      index("routes/dashboard/index.tsx"),

      route("predictive-analysis", "routes/dashboard/predictive-analysis.tsx"),
      route("reports", "routes/dashboard/reports.tsx"),
      route("simulations", "routes/dashboard/simulations.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
