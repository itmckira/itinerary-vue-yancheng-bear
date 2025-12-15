import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  // ✅ GitHub Pages: 把這裡改成你的 repo 名稱，例如 /my-trip-page/
  base: "/itinerary-vue-yancheng-bear/"
});
