// src/models/ticket.model.js

import { DataTypes, Model } from 'sequelize';

export default (sequelizeInstance, DataTypes) => {

    class Ticket extends Model {
        /**
         * Helper method for defining associations.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Define associations here:
            
            // A Ticket belongs to one Event (1:N relationship)
            Ticket.belongsTo(models.Event, {
                foreignKey: 'eventId',
                as: 'event', // The alias used when querying
            });

            // A Ticket belongs to one User (1:N relationship)
            // Assuming you have a 'User' model defined in your application
            Ticket.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user', // The alias used when querying
            });
        }
    }

    Ticket.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        // --- Foreign Keys (Relationships) ---
        eventId: {
            // Links this ticket to a specific Event
            type: DataTypes.INTEGER,
            allowNull: false,
            // References: {
            //     model: 'events', // table name
            //     key: 'id',
            // } // This is often defined via the association, not here
        },
        userId: {
            // Links this ticket to a specific User
            type: DataTypes.INTEGER,
            allowNull: false,
            // References: {
            //     model: 'users', // table name
            //     key: 'id',
            // } 
        },
        // ------------------------------------
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        amount: {
            // Total price of the ticket purchase (quantity * ticketPrice)
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        verified: {
            // Status of whether the ticket has been validated/scanned at the event
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        ticketCode: {
            // Unique code for physical/digital ticket scanning (e.g., UUID or hashed ID)
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true, // Should be unique for each ticket
        },
        status: {
            // Status of the ticket (e.g., 'active', 'cancelled', 'refunded')
            type: DataTypes.ENUM('active', 'cancelled', 'refunded', 'pending'),
            defaultValue: 'pending',
        // We'll let timestamps: true handle createdAt and updatedAt
    },
    paystackPaymentReference: {
        type: DataTypes.STRING,
        allowNull: true,
    },},
     {
        sequelize: sequelizeInstance, // Use the instance passed into the function
        tableName: 'tickets', // Use 'tickets' as the table name
        timestamps: true,
    });

    return Ticket;
};