import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { initAuthListener } from "./utils/authListener";
import { toastConfig } from './assets/data/toastConfig.jsx';

initAuthListener()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster  {...toastConfig} />          
      <App />
    </BrowserRouter>
  </StrictMode>,
)
