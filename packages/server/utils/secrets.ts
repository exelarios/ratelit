/**
 * Grabs JWT access token secret from `.env`.
 * Throws an error if the access token's secret doesn't exist.
 */
function JWT() {
  const key = process.env.ACCESS_TOKEN_SECRET;
  if (key == undefined) {
    throw new Error("Failed to find JSONwebtoken's secret token.");
  }
  return key;
}

const secrets = {
  JWT
};

export default secrets;