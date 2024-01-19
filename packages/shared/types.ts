import * as validate from "@/shared/validate";
import { JwtPayload } from "jsonwebtoken";
import { z } from "zod";

export type ErrorCode = 
  | "EXPIRED_ACCESS_TOKEN"
  | "USER_NOT_FOUND"
  | "REGISTER_EMAIL_TAKEN"
  | "EXPIRED_REFRESH_TOKEN"
  | "USER_INCORRECT_PASSWORD"
  | "REFRESH_TOKEN_BEFORE_EXPIRED"
  | "INVALID_AUTH_TOKEN"

export type GraphQLError = {
  extensions: {
    code: ErrorCode
  },
  message: string;
}

export interface Token extends JwtPayload {
  id: string;
  email: string;
}

interface SuccessResponse<T> {
  status: "success"
  message?: string;
  data?: T
}

interface FailedResponse<T> {
  status: "fail" | "error"
  message?: string;
  code?: string
  data?: T
}

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

interface Verify {
  user: User;
  token: AccessToken;
}

export interface List extends Prisma.List {
  editors: {
    user: Pick<User, "firstName" | "lastName">,
    role: Editors["role"]
  }[]
}

export type CreateListRequestParams = z.infer<typeof validate.createList>;

export type TokensResponse = SuccessResponse<Tokens> | FailedResponse<any>;

export type VerifyResponse = SuccessResponse<Verify> | FailedResponse<any>;

export type ListsResponse = SuccessResponse<List[]> | FailedResponse<any>;

export type ListResponse = SuccessResponse<List> | FailedResponse<any>;

export type CreateListResponse = SuccessResponse<typeof validate.createList> | FailedResponse<any>;