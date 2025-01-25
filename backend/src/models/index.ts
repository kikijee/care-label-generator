import {Sequelize, Dialect} from "sequelize";
import dotenv from "dotenv";
import { db_config } from "../config/db.config";
import { define_record } from "./record.model";
import { define_user } from "./user.model"

dotenv.config();

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
  records: define_record(sequelize),
};

// DB Relationships
db.users.hasMany(db.records,{
  foreignKey: 'UserID',
  onDelete: 'CASCADE'
})

db.records.belongsTo(db.users,{
  foreignKey: 'UserID'
})

