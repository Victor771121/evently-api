import { Router } from "express"
import AuthController from "./auth.controller.js"

const router = Router()

router.post('/signup', AuthController.signUp)
router.post('/login', AuthController.login)
router.get('/user/all', AuthController.getAllUsers)
router.get('/user/:id', AuthController.getUserById)
router.delete('/user/:id', AuthController.deleteUser)
router.patch('/user/:id', AuthController.updateUser)

// Correct export for an Express Router instance
export default router;