// src/models/user.model.js

import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcryptjs';

// 1. Create a function that accepts 'sequelize' and 'DataTypes'
export default (sequelizeInstance, DataTypes) => {
    
    // 2. Define the User class inside the function
    class User extends Model {
        // You can define instance methods here, e.g., to compare passwords
        async correctPassword(candidatePassword) {
            return await bcrypt.compare(candidatePassword, this.password);
        }
    }

    // 3. Initialize the model using the passed-in sequelizeInstance
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        photo: {
            type: DataTypes.STRING(128),
            defaultValue: 'https://res.cloudinary.com/diay5ptjl/image/upload/v1724552219/g4mvfep3omrdqxgsbo00.png',
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false,
            unique: true, // You should almost always make email unique
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        // Remove createdAt and updatedAt, as timestamps: true handles them
    }, {
        sequelize: sequelizeInstance, // Use the instance passed into the function
        tableName: 'users',
        timestamps: true,
        hooks: {
            beforeCreate: async (user) => {
                if (user.password) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            },
            beforeUpdate: async (user) => {
                if (user.changed('password')) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            },
        },
    });

    return User;
};