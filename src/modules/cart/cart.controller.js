import CartService from "./cart.service.js";
export default class CartController {
    //add item to cart
    static async addItemToCart(req, res) {
        try {
            if (!req.body || typeof req.body !== 'object' || Object.keys(req.body).length === 0) {
                return res.status(400).json({ message: 'Bad request: request body is missing or empty' });
            }

            const { userId, eventId, quantity } = req.body || {};

            if (!userId || !eventId || typeof quantity === 'undefined') {
                return res.status(400).json({ message: 'Bad request: missing required fields (userId, eventId, quantity)' });
            }

            const newCartItem = await CartService.addItemToCart({ userId, eventId, quantity });
            return res.status(201).json({ message: 'Item added to cart successfully', cartItem: newCartItem });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
    //get cart items by user id
    static async getCartItemsByUserId(req, res) {
        try {
            const { userId } = req.params;
            const cartItems = await CartService.getCartItemsByUserId(userId);
            return res.status(200).json({ message: 'Cart items retrieved successfully', cartItems });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
    //remove item from cart
    static async removeItemFromCart(req, res) {
        try {
            const { cartItemId } = req.params;
            const isDeleted = await CartService.removeItemFromCart(cartItemId);
            if (isDeleted) {
                return res.status(200).json({ message: 'Item removed from cart successfully' });
            } else {
                return res.status(404).json({ message: 'Cart item not found' });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
}
