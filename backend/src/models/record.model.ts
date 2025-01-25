import {Sequelize, INTEGER, STRING} from "sequelize";

export const define_record = (sequelize: Sequelize) => {
    const Record = sequelize.define("Records", {
        RecordID: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        UserID: {
            type: INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'UserID'
            }
        },
        RecordType: {
            type: STRING(13),
            allowNull: false,
            validate: {
                isIn: [['Transcript', 'Certificate']]
            }
        },
    },{timestamps: true});
    return Record;
};