export enum Role {
  Fan = 'fan',
  Artist = 'artist',
}

export interface User {
  suiAddress: string;
  role: Role;
}

export interface LoginPayload {
  idToken: string;
  suiAddress: string;
  suiPrivateKey?: string; // Made optional as it's not needed for zkLogin
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