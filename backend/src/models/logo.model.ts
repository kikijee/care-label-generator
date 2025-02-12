import { Sequelize, Model, DataTypes } from "sequelize";

// Define TypeScript interface for User attributes
interface LogoAttributes {
    LogoID: string;
    References?: number;
    createdAt?: Date; 
    updatedAt?: Date;
}

// Define User model instance type
interface LogoInstance extends Model<LogoAttributes>, LogoAttributes {}

export const define_logo = (sequelize: Sequelize) => {
    const Logo = sequelize.define<LogoInstance>(
        "Logos",
        {
            LogoID: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            References: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            }
        },
        { timestamps: true }
    );

    return Logo;
};
