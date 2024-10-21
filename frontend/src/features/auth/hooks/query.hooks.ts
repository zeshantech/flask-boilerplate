import { useMutation } from "@tanstack/react-query";
import { API } from "../../../services/api";
import { ForgotPasswordRequest, ForgotPasswordResponse, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, ResetPasswordRequest, ResetPasswordResponse, VerifyOtpRequest, VerifyOtpResponse } from "../types";
import { useAuth } from "../../../context/Auth.context";
import { useSnackbar } from "../../../context/Snackbar.context";

export function useLogin() {
  const { handleOnAuthenticate } = useAuth();
  const { showSnackbar } = useSnackbar();

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: async (loginData: LoginRequest) => {
      const response = await API.post<LoginResponse>("/auth/login", loginData);
      return response.data;
    },
    onError: (error) => {
      showSnackbar(error.message, "error");
    },
    onSuccess: (data) => {
      showSnackbar("Login successful");
      handleOnAuthenticate(data.access_token);
    },
  });
}

export function useRegister() {
  const { handleOnAuthenticate } = useAuth();
  const { showSnackbar } = useSnackbar();

  return useMutation<RegisterResponse, Error, RegisterRequest>({
    mutationFn: async (registerData: RegisterRequest) => {
      const response = await API.post<RegisterResponse>("/auth/register", registerData);
      return response.data;
    },
    onError: (error) => {
      showSnackbar(error.message, "error");
    },
    onSuccess: (data) => {
      showSnackbar("Registeration successful");
      handleOnAuthenticate(data.access_token);
    },
  });
}

export function useForgotPassword() {
  const { showSnackbar } = useSnackbar();

  return useMutation<ForgotPasswordResponse, Error, ForgotPasswordRequest>({
    mutationFn: async (forgotData: ForgotPasswordRequest) => {
      const response = await API.post<ForgotPasswordResponse>("/auth/forgot-password", forgotData);
      return response.data;
    },
    onError: (error) => {
      showSnackbar(error.message, "error");
    },
    onSuccess: (data) => {
      showSnackbar(data.message);
    },
  });
}

export function useResetPassword() {
  const { showSnackbar } = useSnackbar();

  return useMutation<ResetPasswordResponse, Error, ResetPasswordRequest>({
    mutationFn: async (resetData: ResetPasswordRequest) => {
      const response = await API.post<ResetPasswordResponse>("/auth/reset-password", resetData);
      return response.data;
    },
    onError: (error) => {
      showSnackbar(error.message, "error");
    },
    onSuccess: (data) => {
      showSnackbar(data.message);
    },
  });
}

export function useVerifyOtp() {
  const { showSnackbar } = useSnackbar();

  return useMutation<VerifyOtpResponse, Error, VerifyOtpRequest>({
    mutationFn: async (verifyData: VerifyOtpRequest) => {
      const response = await API.post<VerifyOtpResponse>("/auth/verify-reset-password-otp", verifyData);
      return response.data;
    },
    onError: (error) => {
      showSnackbar(error.message, "error");
    },
  });
}
