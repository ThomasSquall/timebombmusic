import { AppError } from "./app-error";

export interface ApiResponse {
  data: any;
  error: AppError | null;
}
