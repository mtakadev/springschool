export interface Student {
  name: string;
  email: string;
  password: string;
  enrollmentDate: string
}

export interface Credentials {
  email: string;
  password: string;
}

export interface TwoFactorAuth {
  email: string;
  code: string;
}

export interface ApiResponse {
  message: string;
  token?: string;
}
