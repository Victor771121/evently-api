// src/models/event.model.js

import { DataTypes, Model } from 'sequelize';

// 1. Create a function that accepts 'sequelizeInstance' and 'DataTypes'
export default (sequelizeInstance, DataTypes) => {

    // 2. Define the Event class inside the function
    class Event extends Model {
        // You can define instance methods or associations here if needed later
        /**
         * Helper method for defining associations.
        //  * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        // static associate(models) {
        //   // define association here
        // }
    }

    // Define possible statuses for an event
    const EVENT_STATUSES = ['SCHEDULED', 'ACTIVE', 'COMPLETED', 'CANCELLED'];

    // 3. Initialize the model using the passed-in sequelizeInstance
    Event.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(155),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT, // Use TEXT for potentially longer descriptions
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING(255), // URL to the event image
            defaultValue: 'https://default-event-image-url.com/image.png',
            allowNull: false,
        },
        time: {
            type: DataTypes.TIME, // For time-only storage (e.g., '14:30:00')
            allowNull: false,
        },
        date: {
            type: DataTypes.DATEONLY, // For date-only storage (e.g., '2025-11-07')
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        ticketPrice: {
            type: DataTypes.DECIMAL(10, 2), // Stores price with 2 decimal places (e.g., 99.99)
            allowNull: false,
            defaultValue: 0.00,
        },
        populationLimit: {
            type: DataTypes.INTEGER,
            allowNull: true, // Can be null if there is no limit
            defaultValue: null,
        },
        status: {
            type: DataTypes.ENUM(...EVENT_STATUSES),
            allowNull: false,
            defaultValue: 'SCHEDULED',
        },
        // We'll let timestamps: true handle createdAt and updatedAt
    }, {
        sequelize: sequelizeInstance, // Use the instance passed into the function
        tableName: 'events',
        timestamps: true,
    });

    return Event;
};