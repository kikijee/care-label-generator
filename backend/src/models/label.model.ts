import { Sequelize, Model, DataTypes } from "sequelize";

// Define TypeScript interface for User attributes
interface LabelAttributes {
    LabelID?: number;
    DocumentID: string;
    UserID: number;
    LogoID?: string;
    createdAt?: Date; 
    updatedAt?: Date;
}

// Define User model instance type
interface LabelInstance extends Model<LabelAttributes>, LabelAttributes {}

export const define_label = (sequelize: Sequelize) => {
    const Label = sequelize.define<LabelInstance>(
        "Labels",
        {
            LabelID: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            DocumentID: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            UserID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'UserID'
                }
            },
            LogoID: {
                type: DataTypes.STRING,
                allowNull: true,
                references: {
                    model: 'Logos',
                    key: 'LogoID'
                }
            }
        },
        { timestamps: true }
    );

    return Label;
};
