import Page from "../../../components/Page";
import { LoginFormFieldInterface } from "../types";
import LoginForm from "../components/LoginForm";
import { useLogin } from "../hooks/query.hooks";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const {isPending, mutateAsync} = useLogin()

  const handleOnSignIn = async (input: LoginFormFieldInterface) => {
    await mutateAsync(input);
    navigate('/dashboard')
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
      <LoginForm onSubmit={handleOnSignIn} isLoading={isPending} />
    </Page>
  );
}
