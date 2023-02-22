import jwt from "jsonwebtoken";

function jwtTokens({ user_id, name, email }) {
  const user = { user_id, name, email };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "60m",
  });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  return { accessToken, refreshToken };
}

export { jwtTokens };
