import dotenv from "dotenv";
import Jwt, {JwtPayload} from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';

dotenv.config();

export interface AuthenticatedRequest extends Request {
  body: {
      User?: JwtPayload | string;
  };
}

export async function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction){
  const token = await req.cookies?.care_label_app_token;

  if (!token) {
      res.status(401).send({ error: "Null token" });
      return;
  }

  Jwt.verify(token, process.env.SECRET_KEY as string, (error: Jwt.VerifyErrors | null, user: JwtPayload | string | undefined) => {
      if (error) {
          console.error("JWT Verification Error:", error.message);
          res.status(403).send({ error: error.message });
          return;
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
        res.status(403).send({ error: "Invalid Role Permissions" });
        return;
      }
      next();
    }
  }

