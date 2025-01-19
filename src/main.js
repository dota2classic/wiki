import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import i18n from "./i18n";
import { initializeLanguage } from "@/util/lang.js";

const app = createApp(App);

initializeLanguage();

app.use(router);
app.use(i18n);
app.mount("#app");
