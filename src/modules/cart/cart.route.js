import { Router } from "express";
import CartController from "./cart.controller.js";
import verifyToken from "../../lib/middlewares/authorization.js";

const router = Router()

router.post('/items', verifyToken, CartController.addItemToCart);
router.get('/items/user/:userId', verifyToken, CartController.getCartItemsByUserId);
router.delete('/items/:cartItemId', verifyToken, CartController.removeItemFromCart);

// Correct export for an Express Router instance


export default router;