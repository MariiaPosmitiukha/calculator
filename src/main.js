import { createApp } from "vue";
import { createHead } from "@vueuse/head";
import App from "./App.vue";
import routes from "./routes.js";
import "./assets/bootstrap.sass";

const app = createApp(App);
const head = createHead();

app.use(head);

import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

app.use(router);

router.isReady().then(() => {
  app.mount("#app");
});
