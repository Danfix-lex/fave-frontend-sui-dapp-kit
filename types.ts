
export enum Role {
  Fan = 'FAN',
  Artist = 'ARTIST',
}

export interface User {
  suiAddress: string;
  role: Role;
}

export interface LoginPayload {
  idToken: string;
  suiAddress: string;
  role: Role;
}

export interface LoginResponse {
  sessionToken: string;
  user: User;
}

export interface AuthContextType {
  sessionToken: string | null;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
}
