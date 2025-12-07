import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config.js";

//token generation with JWT
export const GenerateToken = (userId: any) => {
  const token = jwt.sign({ id: userId }, SECRET_KEY);
  return token;
};
