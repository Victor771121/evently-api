import { Router } from "express"
import EventController from "./events-controller.js"
import verifyToken from "../../lib/middlewares/authorization.js"

const router = Router()

router.post( '/', verifyToken, EventController.createNewEvents)
router.patch('/:id', EventController.updateEvents)
router.get('/all', EventController.getAllEvents)
router.get('/:id', EventController.findEventsById)
router.delete('/:id', EventController.deleteEvents)


export default router;