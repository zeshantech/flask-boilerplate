// src/components/ForgotPasswordForm.tsx

import { CssBaseline, Stack, Paper, Typography, Divider } from "@mui/material";
import Button from "../../../components/Button";
import { Form, TextField } from "../../../components/Form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ForgotPasswordFormFieldInterface } from "../types";

interface ForgotPasswordFormProps {
  onSubmit: (formData: ForgotPasswordFormFieldInterface) => void;
  isLoading: boolean;
}

export default function ForgotPasswordForm({ onSubmit, isLoading }: ForgotPasswordFormProps) {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<ForgotPasswordFormFieldInterface>({
    resolver: yupResolver(validationSchema),
  });

  const handleOnSubmit = (data: ForgotPasswordFormFieldInterface) => {
    onSubmit(data);
  };

  return (
    <Stack component={Paper} elevation={3} p={3} sx={{ width: 400, margin: "auto" }}>
      <CssBaseline />
      <Typography variant="h5" align="center" mb={3}>
        Forgot Password
      </Typography>
      <Form onSubmit={handleSubmit(handleOnSubmit)} rowGap={2}>
        <TextField register={register} name="email" label="Email Address" error={!!errors.email} helperText={errors.email?.message} autoFocus />
        <Button loading={isLoading} type="submit" variant="contained" fullWidth>
          Send OTP
        </Button>
      </Form>
      <Divider sx={{ my: 2 }} />
      <Typography variant="body2" textAlign="center">
        Remember your password?{" "}
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
});
