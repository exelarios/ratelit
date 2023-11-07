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