import { type ReactNode, type JSX } from "react";
import { Navigate } from "react-router-dom";
import { useRegistration } from "@/context/RegistrationContext";

interface GuestRouteProps {
  children: ReactNode;
}

const GuestRoute = ({ children }: GuestRouteProps): JSX.Element => {
  const { registrationData } = useRegistration();

  const isAuthenticated =
    !!registrationData.apiKey &&
    !!registrationData.fullName &&
    !!registrationData.age &&
    !!registrationData.gender &&
    !!registrationData.level;

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default GuestRoute;