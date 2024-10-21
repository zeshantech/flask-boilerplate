import { Route, Routes } from "react-router-dom";
import { useAuth } from "./context/Auth.context";
import { DashboardPage } from "./features/home/pages";
import { LoginPage, ForgotPasswordPage, RegisterationPage, ResetPasswordPage, VerifyResetPasswordOtpPage } from "./features/auth/pages";
import NotFoundPage from "./features/404/NotFound.page";
import Appbar from "./layout/Appbar";

export default function MainRoutes() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <AuthenticatedRoutes /> : <UnAuthenticatedRoutes />;
}

function AuthenticatedRoutes() {
  return (
    <Routes>
      <Route element={[<Appbar />]}>
        <Route path="/" Component={DashboardPage} />
        <Route path="/dashboard" Component={DashboardPage} />
        <Route path="*" Component={NotFoundPage} />
      </Route>
    </Routes>
  );
}

function UnAuthenticatedRoutes() {
  return (
    <Routes>
      <Route path="/" Component={LoginPage} />
      <Route path="/auth/login" Component={LoginPage} />
      <Route path="/auth/register" Component={RegisterationPage} />
      <Route path="/auth/forgot-password" Component={ForgotPasswordPage} />
      <Route path="/auth/verify-reset-password-otp" Component={VerifyResetPasswordOtpPage} />
      <Route path="/auth/reset-password" Component={ResetPasswordPage} />
      <Route path="*" Component={NotFoundPage} />
    </Routes>
  );
}
