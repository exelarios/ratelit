import { login } from "@/shared/validate";
import { z } from "zod";

interface ResponseData<T> {
  success: boolean;
  message?: string;
  payload?: T
}

interface LoginResponsePayload {
  accessToken: string;
  refreshToken: string;
}

export type LoginRequestParams = z.infer<typeof login>;

export type LoginResponse = ResponseData<LoginResponsePayload>;