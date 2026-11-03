export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "artist" | "manager";
}

export interface Manager extends User {
  role: "manager";
}

export interface Artist extends User {
  role: "artist";
  managerId: string;
}
