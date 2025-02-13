import {Sequelize, Dialect} from "sequelize";
import dotenv from "dotenv";
import { db_config } from "../config/db.config";
import { define_label } from "./label.model";
import { define_user } from "./user.model";
//import { define_logo } from "./logo.model";
import  admin, {ServiceAccount}  from "firebase-admin";
import { firebase_service } from "../config/db.config";
import { getStorage } from "firebase-admin/storage";

dotenv.config();

const serviceAccount = require('../../care-label-app-firebase-adminsdk-fbsvc-40523dc212.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "care-label-app.firebasestorage.app"  
})

export const bucket = getStorage().bucket();


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
  //logos: define_logo(sequelize)
};

// DB Relationships
db.users.hasMany(db.labels,{
  foreignKey: 'UserID',
  onDelete: 'CASCADE'
})

db.labels.belongsTo(db.users,{
  foreignKey: 'UserID'
})

// db.logos.hasMany(db.labels,{
//   foreignKey: 'LogoID',
// })

// db.labels.belongsTo(db.logos,{
//   foreignKey: 'LogoID'
// })


