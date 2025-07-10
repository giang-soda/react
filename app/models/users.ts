export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  status: boolean;
  count: number;
  createdAt: Date;
  updatedAt: Date;
}
