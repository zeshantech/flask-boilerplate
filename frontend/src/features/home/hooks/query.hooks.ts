// src/hooks/useChangePassword.ts
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSnackbar } from "../../../context/Snackbar.context";
import { ChangePasswordRequest, ChangePasswordResponse, EditProfileRequest, EditProfileResponse, User } from "../types";
import { API } from "../../../services/api";

export function useChangePassword() {
  const { showSnackbar } = useSnackbar();

  return useMutation<ChangePasswordResponse, Error, ChangePasswordRequest>({
    mutationFn: async (changePasswordData: ChangePasswordRequest) => {
      const response = await API.post<ChangePasswordResponse>("/auth/change-password", changePasswordData);
      return response.data;
    },
    onError: (error) => {
      showSnackbar(error.message, "error");
    },
    onSuccess: (data) => {
      showSnackbar(data.message, "success");
    },
  });
}

export function useEditProfile() {
  const { showSnackbar } = useSnackbar();

  return useMutation<EditProfileResponse, Error, EditProfileRequest>({
    mutationFn: async (editProfileData: EditProfileRequest) => {
      const response = await API.put<EditProfileResponse>("/user/me", editProfileData);
      return response.data;
    },
    onError: (error) => {
      showSnackbar(error.message, "error");
    },
    onSuccess: () => {
      showSnackbar("Profile updated successfully!", "success");
    },
  });
}

export function useGetUser() {
  return useQuery<User, Error>({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await API.get<User>("/user/me");
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}
