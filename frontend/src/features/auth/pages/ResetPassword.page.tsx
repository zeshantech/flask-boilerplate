import Page from "../../../components/Page";
import { ResetPasswordFormFieldInterface } from "../types";
import ResetPasswordForm from "../components/ResetPasswordForm";
import { useResetPassword } from "../hooks/query.hooks";
import { useSnackbar } from "../../../context/Snackbar.context";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { showSnackbar } = useSnackbar();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token") || "";

  const { mutateAsync, isPending } = useResetPassword();

  const handleOnSubmit = async (input: ResetPasswordFormFieldInterface) => {
    if (!token) {
      showSnackbar("Token is required to reset password", "error");
      return;
    }

    await mutateAsync({ password: input.password, token });
    navigate('/auth/login')
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
      <ResetPasswordForm onSubmit={handleOnSubmit} isLoading={isPending} />
    </Page>
  );
}
