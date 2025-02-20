import { db } from "../models";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { StatusCodes } from 'http-status-codes';
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const login = async (req: Request, res: Response) => {
    try {
        const{Email, Password} = req.body;
        const user = await db.users.findOne({where:{Email:Email}})
        if (!user){
            res.status(StatusCodes.NOT_FOUND).send({message:`user with email: ${Email} not found`});
            return;
        }
        const check = await bcrypt.compare(Password,user.Password);
        if(!check){
            res.status(StatusCodes.UNAUTHORIZED).send({message:'invalid password'});
            return;
        }
        const payload = {
            UserID: user.UserID,
            Email: user.Email,
            Name: user.Name,
            Role: user.Role,
            Website: user.Website,
            RnNumber: user.RnNumber,
            Address: user.Address

        }
        const token = Jwt.sign(payload,process.env.SECRET_KEY as string,{expiresIn:'1h'});
        res.cookie('care_label_app_token', token, { 
            httpOnly: true, 
            sameSite: 'lax', 
            maxAge: 60 * 60 * 1000,  // 1 hour expiration
            secure: false,
            path: '/'
        });
        res.status(StatusCodes.OK).send({
            message:"Logged in successfully",
            user:payload
        })
    } catch (error: any) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
}

export const logout =(req: Request, res: Response)=>{   // this function is to delete the token in client side cookie
    try {
        res.clearCookie('care_label_app_token');
        res.status(StatusCodes.OK).send({message:"logged out"})
    } catch (error: any) {
        res.status(StatusCodes.UNAUTHORIZED).send({message:error.message});
    }
}

export const verify =(req: Request, res: Response)=>{
    res.status(StatusCodes.OK).send({message: "successfully verified"})
}