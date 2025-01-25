import express, { Router } from "express";
import { login } from "../controllers/auth.contoller";
import { validateData } from "../middleware/validation.middleware";
import { userLoginSchema } from "../schemas/user.schema";

export default ()=>{

    const router: Router = express.Router();

    // creates user (POST -> New entry in database)
    router.post('/login', validateData(userLoginSchema), login);
    
    return router;
}
