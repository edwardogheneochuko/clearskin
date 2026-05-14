import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { initAuthListener } from "./utils/authListener";
import { toastConfig } from './assets/data/toastConfig.jsx';
import { HelmetProvider } from 'react-helmet-async';

initAuthListener()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <HelmetProvider>
     <Toaster  {...toastConfig} />          
      <App />
      </HelmetProvider>
    </BrowserRouter>
  </StrictMode>,
)
