import { defineConfig } from "wxt";
import react from "@vitejs/plugin-react";

// See https://wxt.dev/api/config.html
export default defineConfig({
  vite: () => ({
    plugins: [react()],
  }),
  manifest: {
    name: "Bulería Helper",
    description:
      "Extensión para ayudar a la administracion del repositorio buleria.unileon.es",
    homepage_url: "https://github.com/dcontt00/buleria-helper",
    permissions: ["https://buleria.unileon.es/*", "activeTab", "storage"],
    browser_specific_settings: {
      gecko: {
        id: "buleriahelper@dcontt00",
        strict_min_version: "60.0",
        update_url:
          "https://raw.githubusercontent.com/dcontt00/buleria-helper/main/updates.json",
      },
    },
  },
});
