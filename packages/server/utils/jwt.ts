import jsonwebtoken from "jsonwebtoken";

const verify = (token: string, secretOrPublicKey: string) => {
  return new Promise((resolve, reject) => {
    jsonwebtoken.verify(token, secretOrPublicKey, (error, payload) => {
      if (error != null) {
        reject(error);
      }

      resolve(payload);
    });
  });
}

const jwt = {
  verify
}

export default jwt;