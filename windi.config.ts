import { defineConfig } from "windicss/helpers";

export default defineConfig({
  darkMode: "media",
  plugins: [
    require("@windicss/plugin-heropatterns")({
      patterns: ["diagonal-lines"],
      colors: { default: "#bbb" },
      opacity: { default: "0.5" },
    }),
  ],
});
