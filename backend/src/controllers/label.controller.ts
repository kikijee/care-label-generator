import { db, bucket } from "../models";
import { Request, Response } from "express";
import { Transaction } from "sequelize";
import { StatusCodes } from 'http-status-codes';
import { ObjectId } from 'mongodb';
import { MongoClient } from "mongodb";
import Jwt, { JwtPayload } from "jsonwebtoken";



interface Label {
    label_data: {
        Title: string;
        _id?: string | ObjectId;
        Measurements: {
            SeamGap: number,
            Width: number,
            Height: number,
            FontSize: number,
            TextAlignment: string,
            MarginLeft: number,
            LogoSize: number,
            LogoMarginTop: number,
            LogoMarginBottom: number
        };
        CountryOfOrigin: number;
        FiberContent: Array<number>;
        CareLabel: Array<number>;
        AdditionalInfo: {
            RnNumber: string,
            Address: string,
            Website: string
        };
        Languages: Array<string>;
        ImageURL: string
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
    const transaction: Transaction = await db.sequelize.transaction();
    const mongo_client = new MongoClient(uri);
    try {
        await mongo_client.connect();
        const mongo = mongo_client.db('care-label');
        const collection = mongo.collection<Label>('labels');

        const label = await db.labels.findByPk(req.params.id, { transaction });

        if (!label) {
            res.status(StatusCodes.NOT_FOUND).send({ message: `label with id ${req.params.id} not found` });
        }
        else {
            if (label.UserID !== req.body.User.UserID) {
                res.status(StatusCodes.FORBIDDEN).send({ message: `forbidden operation` });
            }
            else {
                // Get the current image URL from MongoDB
                const document = await collection.findOne({ _id: new ObjectId(label.DocumentID) });
                if (document && document.label_data.ImageURL) {
                    const imageUrl = document.label_data.ImageURL;
                    // Extract file name from the URL
                    const fileName = imageUrl.split("/").pop(); // Get the last part of the URL
                    if (!fileName) {
                        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Failed to extract file name" });
                        return;
                    }
                    // Delete the file from Google Cloud Storage
                    const file = bucket.file(`logos/${fileName}`);
                    await file.delete();
                }

                await collection.deleteOne({ _id: new ObjectId(label.DocumentID) })
                await label.destroy({ transaction })
                await transaction.commit();
                res.status(StatusCodes.OK).send({ message: `label with id ${req.params.id} deleted` });
            }
        }
    }
    catch (error: any) {
        await transaction.rollback();
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
    } finally {
        await mongo_client.close();
    }
}

export const get_label_by_id = async (req: Request, res: Response) => {
    const mongo_client = new MongoClient(uri);
    try {
        await mongo_client.connect();
        const mongo = mongo_client.db('care-label');
        const collection = mongo.collection<Label>('labels');

        const label = await db.labels.findByPk(req.params.id);
        if (!label) {
            res.status(StatusCodes.NOT_FOUND).send({ message: `label with id: ${req.params.id} not found` })
        }
        else {
            if (label.UserID !== req.body.User.UserID) {
                res.status(StatusCodes.FORBIDDEN).send({ message: `forbidden operation` });
            }
            else {
                const result = await collection.findOne({ _id: new ObjectId(label.DocumentID) });
                res.status(StatusCodes.OK).send({ ...result, createdAt: label.createdAt, updatedAt: label.updatedAt });
            }
        }
    }
    catch (error: any) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
    } finally {
        await mongo_client.close();
    }
}

export const get_labels_by_user_id = async (req: Request, res: Response) => {
    const mongo_client = new MongoClient(uri);
    try {
        await mongo_client.connect();
        const mongo = mongo_client.db('care-label');
        const collection = mongo.collection<Label>('labels');

        const labels = await db.labels.findAll({ where: { UserID: req.body.User.UserID } });

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
    catch (error: any) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
    } finally {
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
        else {

            if (label.UserID !== req.body.User.UserID) {
                res.status(StatusCodes.FORBIDDEN).send({ message: `Forbidden operation` });
            }
            else {
                const mongoUpdateResult = await collection.updateOne(
                    { _id: new ObjectId(label.DocumentID) },
                    { $set: req.body.label_data }
                );

                if (mongoUpdateResult.matchedCount === 0) {
                    res.status(StatusCodes.NOT_FOUND).send({ message: `Document not found in MongoDB` });
                }
                else {
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

export const upload_logo = async (req: Request, res: Response) => {
    const transaction: Transaction = await db.sequelize.transaction();
    const mongo_client = new MongoClient(uri);

    try {
        await mongo_client.connect();
        const mongo = mongo_client.db("care-label");
        const collection = mongo.collection("labels");

        // Validate request file
        if (!req.file) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "No file uploaded" });
        }
        else {
            // Find label by ID
            const label = await db.labels.findByPk(req.params.id, { transaction });
            if (!label) {
                res.status(StatusCodes.BAD_REQUEST).json({ message: `No label with ID ${req.params.id}` });
            }
            else {
                const token = await req.cookies?.care_label_app_token;
                Jwt.verify(token, process.env.SECRET_KEY as string, (error: Jwt.VerifyErrors | null, user: any | string | undefined) => {
                    if (error) {
                        console.error("JWT Verification Error:", error.message);
                        res.status(403).send({ error: error.message });
                        return;
                    }

                    if (user) {
                        if (label.UserID !== user.UserID) {
                            res.status(StatusCodes.FORBIDDEN).json({ message: `Forbidden action` });
                            return
                        }
                    }
                });



                const document = await collection.findOne({ _id: new ObjectId(label.DocumentID) });
                if (!document) {
                    res.status(StatusCodes.BAD_REQUEST).json({ message: "No label found" });
                    return;
                }
                else {
                    if (document.ImageURL) {
                        const imageUrl = document.ImageURL;
                        // Extract file name from the URL
                        const fileNameTemp = imageUrl.split("/").pop(); // Get the last part of the URL
                        if (fileNameTemp) {
                            // Delete the file from Google Cloud Storage
                            const fileTemp = bucket.file(`logos/${fileNameTemp}`);
                            await fileTemp.delete();
                        }
                    }
                }

                // Generate hash for the file (SHA-256)
                const fileBuffer = req.file.buffer;
                // const hash = createHash("sha256").update(fileBuffer).digest("hex");

                const fileName = `logos/${Date.now()}-${req.file.originalname}`;
                const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

                const file = bucket.file(fileName);
                await file.save(fileBuffer, { metadata: { contentType: req.file.mimetype } });
                await file.makePublic();

                // Update ImageURL in MongoDB
                await collection.updateOne(
                    { _id: new ObjectId(label.DocumentID) },
                    { $set: { ImageURL: publicUrl } }
                );

                // Commit transaction
                await transaction.commit();

                res.status(StatusCodes.OK).send({ message: "Logo successfully uploaded", url: publicUrl });

            }
        }
    } catch (error: any) {
        await transaction.rollback();
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Upload failed", error: error.message });
    } finally {
        await mongo_client.close();
    }
};

export const remove_image_url = async (req: Request, res: Response) => {
    const mongo_client = new MongoClient(uri);
    const transaction: Transaction = await db.sequelize.transaction();

    try {
        await mongo_client.connect();
        const mongo = mongo_client.db("care-label");
        const collection = mongo.collection("labels");

        // Find the label in SQL
        let label = await db.labels.findByPk(req.params.id, { transaction });
        if (!label) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: `No label with ID ${req.params.id}` });
            return;
        }

        if (label.UserID !== req.body.User.UserID) {
            res.status(StatusCodes.FORBIDDEN).json({ message: `Forbidden action` });
            return;
        }

        // Get the current image URL from MongoDB
        const document = await collection.findOne({ _id: new ObjectId(label.DocumentID) });
        if (!document || !document.ImageURL) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "No image found for this label" });
            return;
        }

        const imageUrl = document.ImageURL;

        // Extract file name from the URL
        const fileName = imageUrl.split("/").pop(); // Get the last part of the URL
        if (!fileName) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Failed to extract file name" });
            return;
        }

        // Delete the file from Google Cloud Storage
        const file = bucket.file(`logos/${fileName}`);
        await file.delete();

        // Remove the image URL from MongoDB
        await collection.updateOne(
            { _id: new ObjectId(label.DocumentID) },
            { $set: { ImageURL: "" } }
        );

        // Commit the transaction
        await transaction.commit();

        res.status(StatusCodes.OK).send({ message: "Logo successfully removed" });

    } catch (error: any) {
        await transaction.rollback();
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Logo removal failure", error: error.message });
    } finally {
        await mongo_client.close();
    }
};
