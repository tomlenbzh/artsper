export class User {
  email?: string;
  token?: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}
