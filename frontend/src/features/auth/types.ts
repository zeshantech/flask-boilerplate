export interface LoginFormFieldInterface {
  email: string;
  password: string;
}

export interface RegisterationFormFieldInterface {
  email: string;
  password: string;
}

export interface ForgotPasswordFormFieldInterface {
  email: string;
}

export interface VerifyResetPasswordOtpFormFieldInterface {
  email: string;
  otp: string;
}

export interface ResetPasswordFormFieldInterface {
  password: string;
  confirmPassword: string;
}

// Login
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
  access_token: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface VerifyOtpResponse {
  token: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export interface ResetPasswordResponse {
  message: string;
}
