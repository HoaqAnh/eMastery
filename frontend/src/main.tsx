import React from "react";
import ReactDOM from "react-dom/client";
import App from "@routers/App.tsx";
import { ThemeProvider } from "./context/ThemeContext";
import { RegistrationProvider } from "./context/RegistrationContext";
import "@styles/global.css";
import "@styles/components/MarkdownContent.css";
import "@config/i18n";
import { GoogleOAuthProvider } from "@react-oauth/google";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <RegistrationProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </RegistrationProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
