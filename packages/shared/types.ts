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