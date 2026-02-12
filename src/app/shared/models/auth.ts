export interface AuthResponse {
  success: boolean;
  message: string;
  statusCode: number;
  userName?: string;
  email?: string;
  token?: string;
  expiration?: string;
  refreshToken?: string;
  refreshTokenExpirationDateTime?: string;
  errors?: string[];
}

export interface LoginRequest {
  email: string;
  password?: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  userName: string;
  email: string;
  phone: string;
  password?: string;
  confirmPassword?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  userId: string;
  token: string;
  newPassword?: string;
  confirmPassword?: string;
}

export interface RefreshTokenRequest {
  token: string;
  refreshToken: string;
}

export interface User {
  id?: string;
  userName?: string;
  email?: string;
  phoneNumber?: string;
  displayName?: string;
  photoUrl?: string;
}

export interface UpdateProfileRequest {
  userId?: string;
  displayName: string;
  phoneNumber: string;
}

export interface ChangePasswordRequest {
  userId?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}

export interface Address {
  id: string;
  firstName: string;
  lastName: string;
  city: string;
  street: string;
  state: string;
  zipCode: string;
}

export interface ConfirmEmailRequest {
  userId: string;
  token: string;
}
