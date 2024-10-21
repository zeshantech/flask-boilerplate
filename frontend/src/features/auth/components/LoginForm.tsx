import { CssBaseline, Stack, Paper, Typography, Divider } from "@mui/material";
import Button from "../../../components/Button";
import { Form, TextField } from "../../../components/Form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { LoginFormFieldInterface } from "../types";
import { Link } from "react-router-dom"; // Import Link

interface LoginFormProps {
  onSubmit: (formData: LoginFormFieldInterface) => void;
  isLoading: boolean;
}

export default function LoginForm({ onSubmit, isLoading }: LoginFormProps) {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginFormFieldInterface>({
    resolver: yupResolver(validationSchema),
  });

  const handleOnSubmit = (data: LoginFormFieldInterface) => {
    onSubmit(data);
  };

  return (
    <Stack component={Paper} elevation={3} p={3} sx={{ width: 400, margin: "auto" }}>
      <CssBaseline />
      <Typography variant="h5" align="center" mb={3}>
        Login to your Account
      </Typography>
      <Form onSubmit={handleSubmit(handleOnSubmit)} rowGap={2}>
        <TextField register={register} name="email" label="Email Address" error={!!errors.email} helperText={errors.email?.message} autoFocus />
        <TextField register={register} name="password" label="Password" type="password" error={!!errors.password} helperText={errors.password?.message} />
        <Button loading={isLoading} type="submit" variant="contained" fullWidth>
          Login
        </Button>
      </Form>
      <Link to="/auth/forgot-password" style={{ textDecoration: "none" }}>
        <Typography variant="body2" my={2} textAlign="end" color="primary">
          Forgot password?
        </Typography>
      </Link>
      <Divider />
      <Typography variant="body2" mt={2} textAlign="center">
        Don't have an Account?{" "}
        <Link to="/auth/register" style={{ textDecoration: "none" }}>
          <Typography component={"span"} color="primary">
            Create Account
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
