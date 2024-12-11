import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";
import { ThemeProvider } from "./components/theme-provider";

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <HydratedRouter />
      </ThemeProvider>
    </StrictMode>
  );
});
