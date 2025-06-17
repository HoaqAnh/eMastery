import { useState, useEffect, type ReactNode, type JSX } from "react";
import { Navigate } from "react-router-dom";
import { useRegistration } from "@/context/RegistrationContext";
import { useApiKeyCheck } from "@features/subscribe/hooks/useApiKeyCheck";
import Loader from "@/components/common/Loader";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps): JSX.Element => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  const { registrationData, updateRegistrationData } = useRegistration();
  const { validateApiKey } = useApiKeyCheck();

  useEffect(() => {
    const verifyAccess = async () => {
      if (isAllowed) {
        setIsVerifying(false);
        return;
      }

      const { apiKey, fullName, age, gender, level } = registrationData;
      if (!apiKey || !fullName || !age || !gender || !level) {
        setIsAllowed(false);
        setIsVerifying(false);
        return;
      }

      const isKeyValid = await validateApiKey(apiKey);

      if (isKeyValid) {
        setIsAllowed(true);
      } else {
        updateRegistrationData({ apiKey: undefined });
        setIsAllowed(false);
      }

      setIsVerifying(false);
    };

    verifyAccess();
  }, [registrationData, validateApiKey, updateRegistrationData, isAllowed]);

  if (isVerifying) {
    return <Loader />;
  }

  return isAllowed ? <>{children}</> : <Navigate to="/welcome" replace />;
};

export default ProtectedRoute;
