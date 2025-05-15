import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <main>
        <AppRoutes />
      </main>
    </BrowserRouter>
  );
};

export default App;