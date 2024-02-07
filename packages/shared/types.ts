export type ErrorCode = 
  | "EXPIRED_ACCESS_TOKEN"
  | "USER_NOT_FOUND"
  | "REGISTER_EMAIL_TAKEN"
  | "EXPIRED_REFRESH_TOKEN"
  | "USER_INCORRECT_PASSWORD"
  | "UNAUTHORIZED_ACCESS"
  | "REFRESH_TOKEN_BEFORE_EXPIRED"
  | "INVALID_AUTH_TOKEN"
  | "USER_AVATAER_FAILED"

export type GraphQLError = {
  extensions: {
    code: ErrorCode
  },
  message: string;
}

export enum TabOptions {
  All = "All",
  Following = "Following",
  Author = "Author"
}