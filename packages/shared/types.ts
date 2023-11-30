import { login } from "@/shared/validate";
import { ClientErrorCode } from "./ClientError";
import Prisma from "prisma/prisma-client";
import { JwtPayload } from "jsonwebtoken";
import { z } from "zod";

export type User = Omit<Prisma.User, "password">;
// export type List = ;
export type Editors = Prisma.EditorsOfList;

export interface AccessToken extends JwtPayload {
  id: string;
  email: string;
}

export interface RefreshToken extends JwtPayload {
  id: string;
  accessExpiration: number;
}

interface SuccessResponse<T> {
  success: true;
  message?: string;
  payload?: T
}

interface FailedResponse<T> {
  success: false;
  message?: string;
  code?: ClientErrorCode;
  payload?: T
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

export type LoginRequestParams = z.infer<typeof login>;

export type TokensResponse = SuccessResponse<Tokens> | FailedResponse<any>;

export type VerifyResponse = SuccessResponse<Verify> | FailedResponse<any>;

export type ListResponse = SuccessResponse<GetList[]> | FailedResponse<any>;