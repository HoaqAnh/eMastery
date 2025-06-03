import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "@routers/App.tsx";
import { ThemeProvider } from './context/ThemeContext';
import "@styles/global.css";
import "@config/i18n"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
  </React.StrictMode>
);