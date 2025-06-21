import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import AppRoutes from './AppRoutes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <main>
        <AppRoutes />
        <Analytics />
      </main>
    </BrowserRouter>
  );
};

export default App;