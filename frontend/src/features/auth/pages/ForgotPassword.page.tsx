import { ForgotPasswordFormFieldInterface } from "../types";
import Page from "../../../components/Page";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import { useForgotPassword } from "../hooks/query.hooks";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useForgotPassword();

  const handleOnSignIn = async (input: ForgotPasswordFormFieldInterface) => {
    await mutateAsync(input);
    navigate(`/auth/verify-reset-password-otp?email=${input.email}`);
  };

  const style = {
    backgroundImage: 'url("https://wallpapers.com/images/hd/cyber-security-interface-skjqyncmzs3h1jcr.jpg")', // Replace with your image URL
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <Page sx={style}>
      <ForgotPasswordForm onSubmit={handleOnSignIn} isLoading={isPending} />
    </Page>
  );
}
