import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import FrontDesk from "../views/FrontDesk.vue";
import Attendance from "../views/Attendance.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/front-desk",
    name: "FrontDesk",
    component: FrontDesk
  },
  {
    path: "/attendance",
    name: "Attendance",
    component: Attendance
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
