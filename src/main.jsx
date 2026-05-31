import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { initAuthListener } from "./utils/authListener";
import { HelmetProvider } from "react-helmet-async";
import ToasterWithTheme from "./store/ToasterWithTheme.jsx";

initAuthListener();

try {
  const stored   = localStorage.getItem("theme-storage");
  const theme    = stored ? JSON.parse(stored)?.state?.theme : null;
  const resolved = theme ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.classList.toggle("dark", resolved === "dark");
} catch {
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <ToasterWithTheme />
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </StrictMode>
);