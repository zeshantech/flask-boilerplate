import { CssBaseline, Stack, Paper, Typography } from "@mui/material";
import Button from "../../../components/Button";
import { Form, TextField } from "../../../components/Form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ChangePasswordFormField } from "../types";
import { useChangePassword } from "../hooks/query.hooks";
import { useSnackbar } from "../../../context/Snackbar.context";

interface ChangePasswordFormProps {
  onClose: () => void;
}

export default function ChangePasswordForm({ onClose }: ChangePasswordFormProps) {
  const { showSnackbar } = useSnackbar();
  const { mutateAsync, isPending } = useChangePassword();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<ChangePasswordFormField>({
    resolver: yupResolver(validationSchema),
  });

  const handleOnSubmit = async (data: ChangePasswordFormField) => {
    await mutateAsync({ currentPassword: data.currentPassword, newPassword: data.newPassword });
    showSnackbar("Password changed successfully");
    onClose();
  };

  return (
    <Stack component={Paper} elevation={3} p={3} sx={{ width: 400, margin: "auto" }}>
      <CssBaseline />
      <Typography variant="h5" align="center" mb={3}>
        Change Password
      </Typography>
      <Form onSubmit={handleSubmit(handleOnSubmit)} rowGap={2}>
        <TextField register={register} name="currentPassword" label="Current Password" type="password" error={!!errors.currentPassword} helperText={errors.currentPassword?.message} autoFocus />
        <TextField register={register} name="newPassword" label="New Password" type="password" error={!!errors.newPassword} helperText={errors.newPassword?.message} />
        <TextField register={register} name="confirmNewPassword" label="Confirm New Password" type="password" error={!!errors.confirmNewPassword} helperText={errors.confirmNewPassword?.message} />
        <Button loading={isPending} type="submit" variant="contained" fullWidth>
          Change Password
        </Button>
      </Form>
    </Stack>
  );
}

const validationSchema = yup.object().shape({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup.string().required("New password is required").min(6, "New password must be at least 6 characters"),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirming your new password is required"),
});
