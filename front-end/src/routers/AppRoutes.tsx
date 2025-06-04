import { type JSX } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/components/layouts/main/MainLayout";
import GuestLayout from "@/components/layouts/guest/GuestLayout";
import NotFoundPage from "@layouts/NotFoundPage";
import Home from "@pages/Home";
import Subscribe from "@/pages/Subscribe";

const AppRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<GuestLayout />}>
        <Route index element={<Home />} />
      </Route>

      <Route path="subscribe" element={<Subscribe />} />

      <Route path="/welcome" element={<MainLayout />}>
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
