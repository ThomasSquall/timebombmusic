import { Todo } from "./Todo";

export interface User {
  id: number;
  email: string;
  auth0_id: string;
  avatar: string;
  name: string;
  is_admin: boolean;
  todos?: Todo[];
}

export interface ImpersonatorInfo {
  id: number;
  name: string;
  email: string;
}

export interface CurrentUser extends User {
  impersonator?: ImpersonatorInfo | null;
}
