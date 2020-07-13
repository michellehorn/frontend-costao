import Vue from "vue";
import VueRouter from "vue-router";
import Monitor from "../views/Monitor.vue";
import LoginAtendimento from "../views/LoginAtendimento.vue";
import LoginOperador from "../views/LoginOperador.vue";
import LoginMonitor from "../views/LoginMonitor.vue";
import FrontDesk from "../views/FrontDesk.vue";
import Operation from "../views/Operation.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/monitor",
    name: "Monitor",
    component: Monitor
  },
  {
    path: "/login-atendimento",
    name: "LoginAtendimento",
    component: LoginAtendimento
  },
  {
    path: "/login-operador",
    name: "LoginOperador",
    component: LoginOperador
  },
  {
    path: "/login-monitor",
    name: "LoginMonitor",
    component: LoginMonitor
  },
  {
    path: "/front-desk",
    name: "FrontDesk",
    component: FrontDesk
  },
  {
    path: "/operation",
    name: "Operation",
    component: Operation
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
