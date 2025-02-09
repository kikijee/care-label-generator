import {Sequelize, Dialect} from "sequelize";
import dotenv from "dotenv";
import { db_config } from "../config/db.config";
import { define_label } from "./label.model";
import { define_user } from "./user.model";
import { define_logo } from "./logo.model";
import { MongoClient } from 'mongodb';

dotenv.config();

const uri = process.env.MONGODB_URI as string;
const mongo_client = new MongoClient(uri);

const sequelize = new Sequelize(db_config.DB as string, db_config.USER as string, db_config.PASSWORD as string, {
  host: db_config.HOST as string,
  dialect: db_config.DIALECT as Dialect,
  pool: {
    max: db_config.pool.max,
    min: db_config.pool.min,
    acquire: db_config.pool.acquire,
    idle: db_config.pool.idle,
  },
});

export const db = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  users: define_user(sequelize),
  labels: define_label(sequelize),
  logos: define_logo(sequelize)
};

// DB Relationships
db.users.hasMany(db.labels,{
  foreignKey: 'UserID',
  onDelete: 'CASCADE'
})

db.labels.belongsTo(db.users,{
  foreignKey: 'UserID'
})

db.logos.hasMany(db.labels,{
  foreignKey: 'LogoID',
})

db.labels.belongsTo(db.logos,{
  foreignKey: 'LogoID'
})

// db.labels.belongsToMany(db.logos,{ through: 'Label_Logos'})
// db.logos.belongsToMany(db.labels,{ through: 'Label_Logos'})

