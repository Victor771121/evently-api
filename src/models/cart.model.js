// src/models/cartItem.model.js

import { DataTypes, Model } from 'sequelize';

export default (sequelizeInstance, DataTypes) => {

    // Renamed the model from Ticket to CartItem
    class CartItem extends Model {
        /**
         * Helper method for defining associations.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Define associations here:
            
            // A CartItem belongs to one Event
            CartItem.belongsTo(models.Event, {
                foreignKey: 'eventId',
                as: 'event', // The alias used when querying
            });

            // A CartItem belongs to one User
            CartItem.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user', // The alias used when querying
            });
            
            // You might also want an association to a Cart model if you introduce a separate Cart header table
            // CartItem.belongsTo(models.Cart, {
            //     foreignKey: 'cartId',
            //     as: 'cart',
            // });
        }
    }

    CartItem.init({
        // Primary Key
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        // --- Foreign Keys (Relationships) ---
        userId: {
            // Links this cart item to a specific User (who owns the cart)
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        eventId: {
            // Links this cart item to a specific Event (the 'product' being added)
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // ------------------------------------
        // Cart Item specific field
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            validate: {
                min: 1 // Quantity must be at least 1
            }
        },
        // --- Removed fields: amount, verified, ticketCode as they are not needed for a cart item ---
    }, {
        sequelize: sequelizeInstance, // Use the instance passed into the function
        // Renamed the table from 'tickets' to 'cartItems'
        tableName: 'cartItems', 
        timestamps: true,
        // Add a unique constraint for a single event per user in the cart
        indexes: [
            {
                unique: true,
                fields: ['userId', 'eventId']
            }
        ]
    });

    return CartItem;
};