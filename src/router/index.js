import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("@/views/Index"),
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("@/views/Dashboard"),
      },
      {
        path: "/device",
        name: "Device",
        component: () => import("@/views/Device"),
      },
      {
        path: "/simulate",
        name: "Simulate",
        component: () => import("@/views/Simulate"),
      },
      {
        path: "/settings",
        name: "Settings",
        component: () => import("@/views/Settings"),
      },
      {
        path: "/about",
        name: "About",
        component: () => import("@/views/About"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
