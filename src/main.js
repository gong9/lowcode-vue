import Vue from "vue";
import App from "./App.vue";
import "./element";
import leopardWebComponent from "leopard-web-component";
import "leopard-web-component/lib/leopard-web-component.css";

Vue.use(leopardWebComponent);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
