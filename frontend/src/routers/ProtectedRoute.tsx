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
      const { apiKey, fullName, age, gender, level } = registrationData;

      if (!apiKey || !fullName || !age || !gender || !level) {
        console.log("Thiếu thông tin đăng ký, đang chuyển hướng...");
        setIsAllowed(false);
        setIsVerifying(false);
        return;
      }

      console.log("Đang xác thực API Key với server...");
      const isKeyValid = await validateApiKey(apiKey);

      if (isKeyValid) {
        console.log("API Key hợp lệ. Cho phép truy cập.");
        setIsAllowed(true);
      } else {
        console.log("API Key không hợp lệ. Xóa key và chuyển hướng...");
        updateRegistrationData({ apiKey: "" });
        setIsAllowed(false);
      }

      setIsVerifying(false);
    };

    verifyAccess();
  }, [registrationData, validateApiKey, updateRegistrationData]);

  if (isVerifying) {
    return <Loader />;
  }

  return isAllowed ? <>{children}</> : <Navigate to="/subscribe" replace />;
};

export default ProtectedRoute;
