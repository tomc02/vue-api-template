import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import "@/assets/tailwind.css";

// Set base URL for API
axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || "http://localhost:3001";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
