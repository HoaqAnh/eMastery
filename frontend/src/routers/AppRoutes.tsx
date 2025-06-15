import { type JSX } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "@components/layouts/MainLayout";
import GuestLayout from "@components/layouts/GuestLayout";
import NotFoundPage from "@pages/NotFoundPage";
import Home from "@pages/Home";
import Subscribe from "@pages/Subscribe";
import Chatbot from "@pages/Chatbot";
import Quiz from "@pages/Quiz";

const AppRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path="welcome" element={<GuestLayout />}>
        <Route index element={<Home />} />
      </Route>

      <Route path="subscribe" element={<Subscribe />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/quiz" element={<Quiz />} />
      </Route>

      {/* 404 Not Found */}
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRoutes;
