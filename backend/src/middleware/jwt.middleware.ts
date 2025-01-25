import dotenv from "dotenv";
import Jwt, {JwtPayload} from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';

dotenv.config();

export interface AuthenticatedRequest extends Request {
  body: {
      User?: JwtPayload | string;
  };
}

export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction){
  const token = req.cookies?.token;

  if (!token) {
      return res.status(401).json({ error: "Null token" });
  }

  Jwt.verify(token, process.env.JWT_SECRET as string, (error: Jwt.VerifyErrors | null, user: JwtPayload | string | undefined) => {
      if (error) {
          console.error("JWT Verification Error:", error.message);
          return res.status(403).json({ error: error.message });
      }

      if (user) {
          req.body.User = user;
      }
      next();
  });
}

export const requireRole = (role : string) => {
    return (req: Request, res: Response, next: NextFunction) => {
      if(role !== req.body.User.Role){
        return res.status(403).json({ error: "Invalid Role Permissions" });
      }
      next();
    }
  }

