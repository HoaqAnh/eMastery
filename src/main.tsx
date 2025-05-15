import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';
import './styles/global.css';
import './config/i18n';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <React.Suspense fallback={<div>Loading translations...</div>}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </React.Suspense>
  </React.StrictMode>
);