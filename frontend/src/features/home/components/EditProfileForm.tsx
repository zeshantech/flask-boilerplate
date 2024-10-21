// src/components/EditProfileForm.tsx
import { CssBaseline, Stack, Paper, Typography } from "@mui/material";
import Button from "../../../components/Button";
import { Form, TextField } from "../../../components/Form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { EditProfileRequest } from "../types";
import { useEditProfile, useGetUser } from "../hooks/query.hooks";
import { useSnackbar } from "../../../context/Snackbar.context";

interface EditProfileFormProps {
  onClose: () => void;
}

export default function EditProfileForm({ onClose }: EditProfileFormProps) {
  const { showSnackbar } = useSnackbar();
  const { mutateAsync, isPending } = useEditProfile();
  const { data } = useGetUser();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<EditProfileRequest>({
    resolver: yupResolver(validationSchema as any),
    defaultValues: data,
  });

  const handleOnSubmit = async (data: EditProfileRequest) => {
    await mutateAsync({ avatar_url: data.avatar_url, bio: data.bio, email: data.email, first_name: data.first_name, last_name: data.last_name });
    showSnackbar("Profile updated");
    onClose();
  };

  return (
    <Stack component={Paper} elevation={3} p={3} sx={{ width: 500, margin: "auto" }}>
      <CssBaseline />
      <Typography variant="h5" align="center" mb={3}>
        Edit Profile
      </Typography>
      <Form onSubmit={handleSubmit(handleOnSubmit)} rowGap={2}>
        <TextField register={register} name="first_name" label="First Name" error={!!errors.first_name} helperText={errors.first_name?.message} autoFocus />
        <TextField register={register} name="last_name" label="Last Name" error={!!errors.last_name} helperText={errors.last_name?.message} />
        <TextField register={register} name="bio" label="Bio" multiline rows={4} error={!!errors.bio} helperText={errors.bio?.message} />
        <TextField register={register} name="avatar_url" label="Avatar URL" error={!!errors.avatar_url} helperText={errors.avatar_url?.message} />
        <TextField register={register} name="email" label="Email Address" type="email" error={!!errors.email} helperText={errors.email?.message} />
        <Button loading={isPending} type="submit" variant="contained" fullWidth>
          Save Changes
        </Button>
      </Form>
    </Stack>
  );
}

const validationSchema = yup.object().shape({
  first_name: yup.string().required("First name is required").max(50, "First name is too long"),
  last_name: yup.string().required("Last name is required").max(50, "Last name is too long"),
  bio: yup.string().max(500, "Bio is too long"),
  avatar_url: yup.string().url("Must be a valid URL").nullable(),
  email: yup.string().required("Email is required").email("Email is invalid"),
});
