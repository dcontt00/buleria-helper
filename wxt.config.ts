import { defineConfig } from "wxt";
import react from "@vitejs/plugin-react";

// See https://wxt.dev/api/config.html
export default defineConfig({
  vite: () => ({
    plugins: [react()],
  }),
  manifest: {
    permissions: ["https://buleria.unileon.es/*", "activeTab"],
    browser_specific_settings: {
      gecko: {
        id: "buleria-helper@dcontt00",
        strict_min_version: "60.0",
      },
    },
  },
});
