import express, { Router } from "express";
import { login, logout, verify } from "../controllers/auth.contoller";
import { validateData } from "../middleware/validation.middleware";
import { userLoginSchema } from "../schemas/user.schema";
import { authenticateToken } from "../middleware/jwt.middleware";

export default ()=>{

    const router: Router = express.Router();

    router.post('/login', validateData(userLoginSchema), login);

    router.delete('/logout', logout);

    router.get('/verify', authenticateToken, verify);
    
    return router;
}
