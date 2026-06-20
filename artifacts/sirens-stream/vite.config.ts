import { defineConfig } from "vite";
    import react from "@vitejs/plugin-react";
    import tailwindcss from "@tailwindcss/vite";
    import path from "path";

    const rawPort = process.env.PORT ?? "3000";
    const port = Number(rawPort);
    const basePath = process.env.BASE_PATH ?? "/";

    export default defineConfig({
      base: basePath,
      plugins: [
        react(),
        tailwindcss(),
        ...(process.env.NODE_ENV !== "production" &&
        process.env.REPL_ID !== undefined
          ? [
              (await import("@replit/vite-plugin-runtime-error-modal")).default(),
              await import("@replit/vite-plugin-cartographer").then((m) =>
                m.cartographer({
                  root: path.resolve(import.meta.dirname, ".."),
                }),
              ),
              await import("@replit/vite-plugin-dev-banner").then((m) =>
                m.devBanner(),
              ),
            ]
          : []),
      ],
      resolve: {
        alias: {
          "@": path.resolve(import.meta.dirname, "src"),
          "@assets": path.resolve(import.meta.dirname, "src", "assets"),
        },
        dedupe: ["react", "react-dom"],
      },
      root: path.resolve(import.meta.dirname),
      build: {
        outDir: path.resolve(import.meta.dirname, "dist"),
        emptyOutDir: true,
        chunkSizeWarningLimit: 600,
        rollupOptions: {
          output: {
            manualChunks: {
              "vendor-react": ["react", "react-dom"],
              "vendor-query": ["@tanstack/react-query"],
              "vendor-supabase": ["@supabase/supabase-js"],
              "vendor-ui": [
                "@radix-ui/react-dialog",
                "@radix-ui/react-dropdown-menu",
                "@radix-ui/react-tabs",
                "@radix-ui/react-tooltip",
                "@radix-ui/react-select",
                "@radix-ui/react-accordion",
                "@radix-ui/react-popover",
              ],
              "vendor-charts": ["recharts"],
              "vendor-motion": ["framer-motion"],
              "vendor-misc": ["lucide-react", "wouter", "date-fns", "zod"],
            },
          },
        },
      },
      server: {
        port,
        strictPort: true,
        host: "0.0.0.0",
        allowedHosts: true,
        fs: { strict: true },
      },
      preview: {
        port,
        host: "0.0.0.0",
        allowedHosts: true,
      },
    });
  