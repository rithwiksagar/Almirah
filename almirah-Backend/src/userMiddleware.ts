import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
//to override the typeps of the express request object
interface authRequest extends Request {
  userId?: string;
}
interface jsonPayLoad {
  id: string;
}

//to authenticate the user token
export const userMiddleware = (
  req: authRequest,
  res: Response,
  next: NextFunction
) => {
  const headers = req.headers['authorization'];
  const decoded = jwt.verify(
    headers as string,
    process.env.SECRET_KEY!
  ) as jsonPayLoad;

  if (decoded) {
    req.userId = decoded.id;
    next();
  } else {
    res.status(403).json({ message: 'incorrect credentials' });
  }
};
