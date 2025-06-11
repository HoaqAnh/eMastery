import { type JSX } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/components/layouts/Main/MainLayout";
import GuestLayout from "@/components/layouts/guest/GuestLayout";
import NotFoundPage from "@layouts/NotFoundPage";
import Home from "@pages/Home";
import Subscribe from "@/pages/Subscribe";
import Chatbot from "@/pages/Chatbot";
import Quiz from "@pages/Quiz"

const AppRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path="welcome" element={<GuestLayout />}>
        <Route index element={<Home />} />
      </Route>

      <Route path="subscribe" element={<Subscribe />} />

      <Route path="/" element={<MainLayout />}>
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
