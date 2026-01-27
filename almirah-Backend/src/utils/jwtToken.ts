import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()
//token generation with JWT
export const GenerateToken = (userId: any) => {
  const token = jwt.sign({ id: userId }, process.env.SECRET_KEY!);
  return token;
};
