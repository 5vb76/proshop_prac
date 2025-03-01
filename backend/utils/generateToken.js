import jwt from "jsonwebtoken";

const generateToekn = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWTTOKEN, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODEENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default generateToekn;
