import { CssBaseline, Stack, Paper, Typography, Divider } from "@mui/material";
import Button from "../../../components/Button";
import { Form, TextField } from "../../../components/Form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { RegisterationFormFieldInterface } from "../types";
import { Link } from "react-router-dom"; // Import Link

interface RegisterationFormProps {
  onSubmit: (formData: RegisterationFormFieldInterface) => void;
  isLoading: boolean;
}

export default function RegisterationForm({ onSubmit, isLoading }: RegisterationFormProps) {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<RegisterationFormFieldInterface>({
    resolver: yupResolver(validationSchema),
  });

  const handleOnSubmit = (data: RegisterationFormFieldInterface) => {
    onSubmit(data);
  };

  return (
    <Stack component={Paper} elevation={3} p={3} sx={{ width: 400, margin: "auto" }}>
      <CssBaseline />
      <Typography variant="h5" align="center" mb={3}>
        Create new Account
      </Typography>
      <Form onSubmit={handleSubmit(handleOnSubmit)} rowGap={2}>
        <TextField register={register} name="email" label="Email Address" error={!!errors.email} helperText={errors.email?.message} autoFocus />
        <TextField register={register} name="password" label="Password" type="password" error={!!errors.password} helperText={errors.password?.message} />
        <Button loading={isLoading} type="submit" variant="contained" fullWidth>
          Create
        </Button>
      </Form>
      
      <Divider />
      <Typography variant="body2" mt={2} textAlign="center">
        Already have an Account{" "}
        <Link to="/auth/login" style={{ textDecoration: "none" }}>
          <Typography component={"span"} color="primary">
            Login
          </Typography>
        </Link>
      </Typography>
    </Stack>
  );
}

const validationSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Email is invalid"),
  password: yup.string().required("Password is required"),
});
