// create ticket
// get all tickets by user id
// get tickets by event id
// get ticket by id
import db from '../../models/index.js'; 
const Ticket = db.Ticket;

export default class TicketService {
    
    static async createTicket(ticketData) {
        return await Ticket.create(ticketData);
    }

    

    
    static async getAllTicketsByUserId(userId) {
        return await Ticket.findAll({ where: { userId } });
    }

     
    static async getAllTicketsByEventId(eventId) {
        return await Ticket.findAll({ where: { eventId } });
    }

     
    static async findTicketById(id) {
        return await Ticket.findByPk(id);
    }
   
}
