import RegisterationForm from "../components/RegistrationForm";
import { RegisterationFormFieldInterface } from "../types";
import { useRegister } from "../hooks/query.hooks";
import { useNavigate } from "react-router-dom";
import Page from "../../../components/Page";

export default function RegisterationPage() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useRegister();

  const handleOnSubmit = async (input: RegisterationFormFieldInterface) => {
  await mutateAsync(input);
  navigate('/dashboard')
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
      <RegisterationForm onSubmit={handleOnSubmit} isLoading={isPending} />
    </Page>
  );
}
