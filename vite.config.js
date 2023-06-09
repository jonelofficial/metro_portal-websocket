import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(process.env.PORT),
    host: false,
  },
  define: {
    "process.env.PORT": `${process.env.PORT}`,
    "process.env.BASEURL": `"${process.env.BASEURL}"`,
    "process.env.GOOGLEAPIKEY": `"${process.env.GOOGLEAPIKEY}"`,
    "process.env.SEDAR_KEY": `"${process.env.SEDAR_KEY}"`,
    "process.env.SEDAR_API": `"${process.env.SEDAR_API}"`,
  },
});
