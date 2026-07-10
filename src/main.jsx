import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { initAuthListener } from "./utils/authListener";
import { HelmetProvider } from "react-helmet-async";
import ToasterWithTheme from "./store/ToasterWithTheme.jsx";
import { registerServiceWorker } from "./utils/registerSW.jsx";
import ErrorBoundary from "./components/layout/ErrorBoundary.jsx";
import { getPreferredTheme } from "./store/themeStore.jsx";

initAuthListener();
registerServiceWorker();

const initialTheme = getPreferredTheme();
document.documentElement.classList.toggle("dark", initialTheme === "dark");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
      <HelmetProvider>
        <ToasterWithTheme />
        <App />
      </HelmetProvider>
    </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);