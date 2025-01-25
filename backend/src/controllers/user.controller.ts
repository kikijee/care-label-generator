import { db } from "../models";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { Transaction } from "sequelize";
import { StatusCodes } from 'http-status-codes';

export const create_user = async (req: Request, res: Response) => {
    // Sequelize Transaction object to keep track of all database transactions to happen in function
    const transaction : Transaction = await db.sequelize.transaction();

    // hashes password with bcrypt library
    const hashedPassword : string = await bcrypt.hash(req.body.Password,10);

    try{
        // user creation in database
        const user = await db.users.create({
            Email: req.body.Email,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            DateOfBirth: req.body.DateOfBirth,
            Password: hashedPassword,
            Role: req.body.Role
        }, {transaction});

        await transaction.commit();

        res.status(StatusCodes.CREATED).send({message: "User created!", user: user})
    }
    catch(error : any){
        // will undo any transaction that happened
        await transaction.rollback();

        // sends back error with status code 500 
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
}

export const delete_user = async (req: Request, res: Response) => {
    try{
        // Sequelize Transaction object to keep track of all database transactions to happen in function
        const transaction : Transaction = await db.sequelize.transaction();

        const user = await db.users.findByPk(req.params.id,{ transaction });
        if (!user){
            throw new Error(`user with id: ${req.params.id} not found`);
        }

        await user.destroy({transaction})

        await transaction.commit();
    }
    catch(error : any){

    }
}

export const get_user_by_id = async (req: Request, res: Response) => {
    try{
        const user = await db.users.findByPk(req.params.id);
        if (!user){
            //throw new Error(`user with id: ${req.params.id} not found`);
            res.status(StatusCodes.NOT_FOUND).send({message:`user with id: ${req.params.id} not found`})
        }
        res.status(StatusCodes.OK).send(user);
    }
    catch(error : any){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
}

export const get_users = async (req: Request, res: Response) => {
    try{
        const users = await db.users.findAll();
        res.status(StatusCodes.OK).send(users);
    }
    catch(error : any){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
}