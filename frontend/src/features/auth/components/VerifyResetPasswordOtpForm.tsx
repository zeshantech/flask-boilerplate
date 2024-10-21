// src/components/VerifyResetPasswordOtpForm.tsx

import { CssBaseline, Stack, Paper, Typography, Divider, Box, CircularProgress } from "@mui/material";
import Button from "../../../components/Button";
import { Form, TextField } from "../../../components/Form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { VerifyResetPasswordOtpFormFieldInterface } from "../types";

interface VerifyResetPasswordOtpFormProps {
  onSubmit: (formData: VerifyResetPasswordOtpFormFieldInterface) => void;
  isLoading: boolean;
  isResending: boolean;
  email: string;
  onResend: () => void;
}

export default function VerifyResetPasswordOtpForm({ onSubmit, isResending, isLoading, email, onResend }: VerifyResetPasswordOtpFormProps) {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<VerifyResetPasswordOtpFormFieldInterface>({
    resolver: yupResolver(validationSchema),
    defaultValues: { email },
  });

  const handleOnSubmit = (data: VerifyResetPasswordOtpFormFieldInterface) => {
    onSubmit(data);
  };

  return (
    <Stack component={Paper} elevation={3} p={3} sx={{ width: 400, margin: "auto" }}>
      <CssBaseline />
      <Typography variant="h5" align="center" mb={3}>
        Verify OTP
      </Typography>
      <Form onSubmit={handleSubmit(handleOnSubmit)} rowGap={2}>
        <TextField register={register} name="email" label="Email Address" error={!!errors.email} helperText={errors.email?.message} disabled />
        <TextField register={register} name="otp" label="OTP" error={!!errors.otp} helperText={errors.otp?.message} />
        <Button loading={isLoading} type="submit" variant="contained" fullWidth>
          Verify OTP
        </Button>
      </Form>
      <Typography variant="body2" mt={2} textAlign="end">
        Didn't receive OTP?{" "}
        {isResending ? (
          <CircularProgress />
        ) : (
          <Box component="span" sx={{ cursor: "pointer", color: "primary.main" }} onClick={onResend}>
            Resend OTP
          </Box>
        )}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="body2" textAlign="center">
        Need help?{" "}
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
  otp: yup.string().required("OTP is required").length(6, "OTP must be 6 digits"),
});
