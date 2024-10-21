export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ChangePasswordFormField {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ChangePasswordResponse {
  message: string;
}

export interface EditProfileRequest {
  first_name: string;
  last_name: string;
  bio: string;
  avatar_url: string;
  email: string;
}

export interface EditProfileResponse {
  id: string;
  first_name: string;
  last_name: string;
  bio: string;
  avatar_url: string;
  email: string;
  is_varified: boolean;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  bio: string;
  avatar_url: string;
  email: string;
  is_varified: boolean;
}
