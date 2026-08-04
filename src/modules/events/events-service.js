import db from '../../models/index.js'; 
const Event = db.Event;

export default class EventService {
    // create a new events
 static async creatNewEvents(eventData) {
        return await Event.create(eventData);
    }
    // get event by id
static async findEventsById(id) {
        return await Event.findByPk(id);
    }

    // update event by id
 static async updateEvents(id, updateData) {
        const events = await Event.findByPk(id);
        if (events) {
            return await events.update(updateData);
        }   
        return null;
    }
    // delete event by id
static async deleteEvents(id) {
        const Events = await Event.findByPk(id);
        if (Events) {
            await Event.destroy({where: { id }});
            return true;
        }
        return false;
    }
    // get all events
static async getAllEvents() {
        return await Event.findAll();
    }
   
}