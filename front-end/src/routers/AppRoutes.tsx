import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '@/pages/Home';
import NotFoundPage from '@layouts/NotFoundPage';
import MainLayout from '@layouts/Main/MainLayout';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                {/* <Route path="about" element={<AboutPage />} /> */}
            </Route>

            {/* 404 Not Found */}
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
    );
};

export default AppRoutes;