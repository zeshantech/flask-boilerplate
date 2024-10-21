import { useNavigate, useLocation } from "react-router-dom";
import Page from "../../../components/Page";
import { VerifyResetPasswordOtpFormFieldInterface } from "../types";
import VerifyResetPasswordOtpForm from "../components/VerifyResetPasswordOtpForm";
import { useForgotPassword, useVerifyOtp } from "../hooks/query.hooks";

export default function VerifyResetPasswordOtpPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email") || "";

  const { mutateAsync: verifyOtpMutateAsync, isPending: isVerifyingOtp } = useVerifyOtp();
  const { mutateAsync: forgotPasswordMutateAsync, isPending: isForgotPasswordPending } = useForgotPassword();

  const handleResend = async () => {
    await forgotPasswordMutateAsync({ email });
  };

  const handleSubmit = async (input: VerifyResetPasswordOtpFormFieldInterface) => {
    const response = await verifyOtpMutateAsync(input);
    navigate(`/auth/reset-password?token=${encodeURIComponent(response.token)}`);
  };

  const style = {
    backgroundImage: 'url("https://wallpapers.com/images/hd/tech-background-t29vt7psb6i6sgcy.jpg")', // Replace with your image URL
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <Page sx={style}>
      <VerifyResetPasswordOtpForm onSubmit={handleSubmit} isResending={isForgotPasswordPending} isLoading={isVerifyingOtp} email={email} onResend={handleResend} />
    </Page>
  );
}
