/**
 * Grabs JWT access token secret from `.env`.
 * Throws an error if the access token's secret doesn't exist.
 */
function accessToken() {
  const key = process.env.ACCESS_TOKEN_SECRET;
  if (key == undefined) {
    throw new Error("Failed to find auth secret access token.");
  }
  return key;
}

function refreshToken() {
  const key = process.env.REFRESH_TOKEN_SECRET;
  if (key == undefined) {
    throw new Error("Failed to find auth secret refresh token.");
  }
  return key;
}

const secrets = {
  accessToken,
  refreshToken
};

export default secrets;