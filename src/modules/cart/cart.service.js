import db from '../../models/index.js';
const Cart = db.Cart;

export default class CartService {

    static async addItemToCart(cartItemData) {
        return await Cart.create(cartItemData);
    }

    static async getCartItemsByUserId(userId) {
        return await Cart.findAll({ where: { userId } });
    }

    static async removeItemFromCart(cartItemId) {
        const cartItem = await Cart.findByPk(cartItemId);
        if (cartItem) {
            await cartItem.destroy(); // instance method, no 'where' needed
            return true;
        }
        return false;
    }
}