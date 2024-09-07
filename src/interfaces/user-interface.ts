export interface User {
  id: string;
  name: string;
  email: string;
  verifiedEmail: boolean;
  role: string;
  image: string | null;
}
