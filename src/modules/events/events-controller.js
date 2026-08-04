import EventService from "./events-service.js"

export default class EventController {
    // create event
    static async createNewEvents(req, res) {
        try {
            // Guard against missing body (avoids destructuring undefined)
            if (!req.body || typeof req.body !== 'object' || Object.keys(req.body).length === 0) {
                return res.status(400).json({ message: 'Bad request: request body is missing or empty' });
            }

            let { title, description, date, time, location, ticketPrice, populationLimit, dateTime } = req.body || {};

            // Support a combined `dateTime` or an ISO `date` string that contains a time component
            if ((!date || !time) && dateTime) {
                const dt = new Date(dateTime);
                if (!isNaN(dt.getTime())) {
                    if (!date) date = dt.toISOString().split('T')[0];
                    if (!time) time = dt.toTimeString().split(' ')[0];
                }
            }

            // If client sent an ISO string in `date` like '2025-12-01T14:30:00', split it
            if ((!time || !date) && typeof date === 'string' && date.includes('T')) {
                const parts = date.split('T');
                if (!date) date = parts[0];
                if (!time) time = parts[1].split('Z')[0].split('+')[0];
            }

            // Basic validation (model requires several non-null fields)
            if (!title || !description || !date || !time || !location) {
                return res.status(400).json({ message: 'Bad request: missing required fields (title, description, date, time, location)' });
            }

            const newEvent = await EventService.creatNewEvents({ title, description, date, time, location, ticketPrice, populationLimit });
            return res.status(201).json({ message: 'Event created successfully', event: newEvent });
        } catch (error) {
            // Handle Sequelize validation error(s) more gracefully
            if (error && (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError')) {
                const details = error.errors ? error.errors.map((e) => ({ message: e.message, field: e.path })) : [{ message: error.message }];
                return res.status(400).json({ message: 'Validation error', errors: details });
            }

            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    // get all events
    static async getAllEvents(req, res) {
        try {
            const events = await EventService.getAllEvents()
            return res.status(200).json({ message: 'successful!', events: events });

        } catch (error) {
            return res.status(500).json({ message: 'internal server error', error: error.message })
        }

    }

    // get event by id
    static async findEventsById(req, res) {
        try {
            const { id } = req.params;
            const event = await EventService.findEventsById(id)
            if (!event) {
                return res.status(404).json({ message: 'event not found' })
            }

            return res.status(200).json({ message: 'Event found', event });
        }
        catch (error) {
            return res.status(500).json({ message: 'internal server error', error: error.message })
        }
    }

    // update event by id
    static async updateEvents(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const updatedEvent = await EventService.updateEvents(id, updateData);
            if (!updatedEvent) {
                return res.status(404).json({ message: 'Event not found' });
            }
            return res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    // delete event by id
    static async deleteEvents(req, res) {
        try {
            const { id } = req.params;
            const isDeleted = await EventService.deleteEvents(id);
            if (!isDeleted) {
                return res.status(404).json({ message: 'Event not found' })
            }
            return res.status(200).json({ message: 'Event deleted successfully' });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
}