import { Sequelize, Model, DataTypes } from "sequelize";

// Define TypeScript interface for User attributes
interface UserAttributes {
    UserID?: number;
    Email: string;
    FirstName: string;
    LastName: string;
    DateOfBirth: string;
    Password: string;
    Role: "Admin" | "User";
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
            FirstName: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            LastName: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            DateOfBirth: {
                type: DataTypes.DATEONLY,
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
        },
        { timestamps: true }
    );

    return User;
};
