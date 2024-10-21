import { CssBaseline, Stack, Paper, Typography, Divider } from "@mui/material";
import Button from "../../../components/Button";
import { Form, TextField } from "../../../components/Form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ResetPasswordFormFieldInterface } from "../types";

interface ResetPasswordFormProps {
  onSubmit: (formData: ResetPasswordFormFieldInterface) => void;
  isLoading: boolean;
}

export default function ResetPasswordForm({ onSubmit, isLoading }: ResetPasswordFormProps) {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<ResetPasswordFormFieldInterface>({
    resolver: yupResolver(validationSchema),
  });

  const handleOnSubmit = (data: ResetPasswordFormFieldInterface) => {
    onSubmit(data);
  };

  return (
    <Stack component={Paper} elevation={3} p={3} sx={{ width: 400, margin: "auto" }}>
      <CssBaseline />
      <Typography variant="h5" align="center" mb={3}>
        Reset Password
      </Typography>
      <Form onSubmit={handleSubmit(handleOnSubmit)} rowGap={2}>
        <TextField register={register} name="password" label="New Password" type="password" error={!!errors.password} helperText={errors.password?.message} />
        <TextField register={register} name="confirmPassword" label="Confirm Password" type="password" error={!!errors.confirmPassword} helperText={errors.confirmPassword?.message} />
        <Button loading={isLoading} type="submit" variant="contained" fullWidth>
          Reset Password
        </Button>
      </Form>
      <Divider sx={{ my: 2 }} />
      <Typography variant="body2" textAlign="center">
        Remembered your password?{" "}
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
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});
