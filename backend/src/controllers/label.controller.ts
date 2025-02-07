import { db } from "../models";
import { Request, Response } from "express";
import { Transaction } from "sequelize";
import { StatusCodes } from 'http-status-codes';
import { ObjectId } from 'mongodb';
import { MongoClient } from "mongodb";

interface Label {
    label_data:{
        Title: string;
        _id?: string | ObjectId;
        Measurements:{
            SeamGap: number,
            Width: number,
            Height: number,
            FontSize: number,
            TextAlignment: string,
            MarginLeft: number
        };
        CountryOfOrigin: number;
        FiberContent: Array<number>;
        CareLabel: Array<number>;
        AdditionalInfo:{
            RnNumber: string,
            Address: string,
            Website: string
        };
        Languages: Array<string>;
    }
}

const uri = process.env.MONGODB_URI as string;


export const create_label = async (req: Request, res: Response) => {
    const mongo_client = new MongoClient(uri);
    
    try {
        await mongo_client.connect();
        //const session = mongo_client.startSession();
        const transaction: Transaction = await db.sequelize.transaction();

        try {
            // Start MongoDB transaction
            //session.startTransaction();

            const mongo = mongo_client.db('care-label');
            const collection = mongo.collection<Label>('labels');
            //const result = await collection.insertOne(req.body.label_data, { session });
            const result = await collection.insertOne(req.body.label_data);

            // SQL transaction
            const label = await db.labels.create({
                DocumentID: result.insertedId.toString(),
                UserID: req.body.User.UserID
            }, { transaction });

            // Commit both transactions
            await transaction.commit();
            //await session.commitTransaction();

            res.status(StatusCodes.CREATED).send({ message: "Label created!", sql: label, nosql: result });

        } catch (error: any) {
            // Rollback both transactions
            await transaction.rollback();
            //await session.abortTransaction();

            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
        } finally {
            //session.endSession();
            await mongo_client.close();
        }
    } catch (error: any) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
};


export const delete_label = async (req: Request, res: Response) => {
    const transaction : Transaction = await db.sequelize.transaction();
    const mongo_client = new MongoClient(uri);
    try{
        await mongo_client.connect();
        const mongo = mongo_client.db('care-label');
        const collection = mongo.collection<Label>('labels');

        const label = await db.labels.findByPk(req.params.id,{ transaction });

        if (!label){
            res.status(StatusCodes.NOT_FOUND).send({message: `label with id ${req.params.id} not found`});
        }
        else{
            if (label.UserID !== req.body.User.UserID){
                res.status(StatusCodes.FORBIDDEN).send({message: `forbidden operation`});
            }
            else{
                await collection.deleteOne({_id: new ObjectId(label.DocumentID)})
                await label.destroy({transaction})
                await transaction.commit();
                res.status(StatusCodes.OK).send({message: `label with id ${req.params.id} deleted`});
            }
        }
    }
    catch(error : any){
        await transaction.rollback();
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }finally{
        await mongo_client.close();
    }
}

export const get_label_by_id = async (req: Request, res: Response) => {
    const mongo_client = new MongoClient(uri);
    try{
        await mongo_client.connect();
        const mongo = mongo_client.db('care-label');
        const collection = mongo.collection<Label>('labels');

        const label = await db.labels.findByPk(req.params.id);
        if (!label){
            res.status(StatusCodes.NOT_FOUND).send({message:`label with id: ${req.params.id} not found`})
        }
        else{
            if (label.UserID !== req.body.User.UserID){
                res.status(StatusCodes.FORBIDDEN).send({message: `forbidden operation`});
            }
            else{
                const result = await collection.findOne({_id: new ObjectId(label.DocumentID)});
                res.status(StatusCodes.OK).send({...result,createdAt:label.createdAt,updatedAt:label.updatedAt});
            }
        }
    }
    catch(error : any){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }finally{
        await mongo_client.close();
    }
}

export const get_labels_by_user_id = async (req: Request, res: Response) => {
    const mongo_client = new MongoClient(uri);
    try{
        await mongo_client.connect();
        const mongo = mongo_client.db('care-label');
        const collection = mongo.collection<Label>('labels');

        const labels = await db.labels.findAll({where:{UserID: req.body.User.UserID}});

        const documentIds = labels.map(label => new ObjectId(label.DocumentID));

        const mongoLabels = await collection.find({ _id: { $in: documentIds } }).toArray();

        const mergedResults = labels.map(label => {
            const mongoData = mongoLabels.find(mongoLabel => mongoLabel._id.toString() === label.DocumentID);
            return {
                LabelID: label.LabelID,
                createdAt: label.createdAt,
                updatedAt: label.updatedAt,
                ...mongoData // Spread MongoDB document data
            };
        });

        res.status(StatusCodes.OK).send(mergedResults);
    }
    catch(error : any){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error.message});
    }finally{
        await mongo_client.close();
    }
}

export const update_label = async (req: Request, res: Response) => {
    const mongo_client = new MongoClient(uri);

    try {
        await mongo_client.connect();
        const mongo = mongo_client.db('care-label');
        const collection = mongo.collection<Label>('labels');

        const label = await db.labels.findByPk(req.params.id);

        if (!label) {
            res.status(StatusCodes.NOT_FOUND).send({ message: `Label with id ${req.params.id} not found` });
        }
        else{

            if (label.UserID !== req.body.User.UserID) {
                res.status(StatusCodes.FORBIDDEN).send({ message: `Forbidden operation` });
            }
            else{
                const mongoUpdateResult = await collection.updateOne(
                    { _id: new ObjectId(label.DocumentID) },
                    { $set: req.body.label_data }
                );

                if (mongoUpdateResult.matchedCount === 0) {
                    res.status(StatusCodes.NOT_FOUND).send({ message: `Document not found in MongoDB` });
                }
                else{
                    res.status(StatusCodes.OK).send({ message: `Label updated successfully` });
                }
            }
        }
    } catch (error: any) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
    } finally {
        await mongo_client.close();
    }
};
