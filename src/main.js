import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import VueSocketIO from "vue-socket.io";
import SocketIO from "socket.io-client";

const options = { autoConnect: false, origins: "*" };

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: SocketIO("http://192.168.0.20:3004", options)
    //options object is Optional
  })
);
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
