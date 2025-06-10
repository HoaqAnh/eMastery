import React from "react";
import ReactDOM from "react-dom/client";
import App from "@routers/App.tsx";
import { ThemeProvider } from "./context/ThemeContext";
import "@styles/global.css";
import "@config/i18n";
import { GoogleOAuthProvider } from "@react-oauth/google";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
