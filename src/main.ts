import { createApp, watch } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";
import virtualRoutes from "virtual:generated-pages";
import customRoutes from "./router/index";
import "virtual:windi.css";
import "virtual:windi-devtools";

const router = createRouter({
  history: createWebHistory(),
  routes: [...virtualRoutes, ...customRoutes],
});

const pinia = createPinia();

watch(
  pinia.state,
  (state) => {
    localStorage.setItem("piniaState", JSON.stringify(state));
  },
  { deep: true }
);

createApp(App).use(router).use(pinia).mount("#app");
