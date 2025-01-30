import { Sequelize, Model, DataTypes } from "sequelize";

// Define TypeScript interface for User attributes
interface UserAttributes {
    UserID?: number;
    Email: string;
    Name: string;
    Password: string;
    Role: "Admin" | "User";
    Website: string | null;
    RnNumber: string | null;
    Address: string | null;
}

// Define User model instance type
interface UserInstance extends Model<UserAttributes>, UserAttributes {}

export const define_user = (sequelize: Sequelize) => {
    const User = sequelize.define<UserInstance>(
        "Users",
        {
            UserID: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            Email: {
                type: DataTypes.STRING(255),
                unique: true,
                allowNull: false,
            },
            Name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            Password: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            Role: {
                type: DataTypes.STRING(5),
                allowNull: false,
                validate: {
                    isIn: [["Admin", "User"]],
                },
            },
            Website: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            RnNumber: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            Address: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
        },
        { timestamps: true }
    );

    return User;
};
