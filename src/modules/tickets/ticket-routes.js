import { Router } from "express"
import TicketController from "./tickets-controller.js"
import verifyToken from "../../lib/middlewares/authorization.js"

const router = Router()

router.post('/', verifyToken, TicketController.createTicket)
router.get('/user/:userId', verifyToken, TicketController.getAllTicketsByUserId)
router.get('/event/:eventId', verifyToken, TicketController.getAllTicketsByEventId)


// Correct export for an Express Router instance
export default router;