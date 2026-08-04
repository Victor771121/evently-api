// create ticket
// get tickets by user id
// get tickets by event id
// get ticket by id

import TicketService from "./ticket-service.js"
export default class TicketController {
    // create ticket
    static async createTicket(req, res) {
        try {
            if (!req.body || typeof req.body !== 'object' || Object.keys(req.body).length === 0) {
                return res.status(400).json({ message: 'Bad request: request body is missing or empty' });
            }

            const { userId, eventId, quantity, amount, ticketCode } = req.body || {};

            if (!userId || !eventId || typeof amount === 'undefined' || !ticketCode) {
                return res.status(400).json({ message: 'Bad request: missing required fields (userId, eventId, amount, ticketCode)' });
            }

            const newTicket = await TicketService.createTicket({ userId, eventId, quantity, amount, ticketCode });
            return res.status(201).json({ message: 'Ticket created successfully', ticket: newTicket });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async getAllTicketsByUserId(req, res) {
        try {
            const { userId } = req.params;
            const tickets = await TicketService.getAllTicketsByUserId(userId);
            return res.status(200).json({ message: 'successful!', tickets: tickets });
        } catch (error) {
            return res.status(500).json({ message: 'internal server error', error: error.message })
        }
    }

    static async getAllTicketsByEventId(req, res) {
        try {
            const { eventId } = req.params; // matches route param /:eventId
            const tickets = await TicketService.getAllTicketsByEventId(eventId);
            return res.status(200).json({ message: 'successful!', tickets: tickets });
        } catch (error) {
            return res.status(500).json({ message: 'internal server error', error: error.message })
        }
    }

    static async getTicketById(req, res) {
        try {
            const { id } = req.params;
            const ticket = await TicketService.findTicketById(id);
            if (!ticket) {
                return res.status(404).json({ message: 'ticket not found' });
            }
            return res.status(200).json({ message: 'successful!', ticket: ticket });
        } catch (error) {
            return res.status(500).json({ message: 'internal server error', error: error.message })
        }
    }
}