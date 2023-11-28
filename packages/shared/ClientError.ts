
export type ClientErrorCode = 
    "INVALID_PAYLOAD" 
  | "INCORRECT_PASSWORD"
  | "EXPIRED_ACCESS_TOKEN"
  | "EXPIRED_REFRESH_TOKEN";

interface ClientErrorOptions extends ErrorOptions {
  code?: ClientErrorCode;
}

/*
 Errors to be publicly display to the end user.
*/
export default class ClientError extends Error {
  public code?: ClientErrorCode;

  constructor(message?: string, errorOptions?: ClientErrorOptions) {
    super(message, errorOptions);
    this.code = errorOptions?.code;
  }
}