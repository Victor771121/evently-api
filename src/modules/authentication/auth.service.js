// 1. Import the initialized models object
import db from '../../models/index.js'; 
const User = db.User;

export default class AuthService {
    static async findUserByEmail(email) {
        return await User.findOne({ where: { email } });
    }

    static async createUser(userData) {
        return await User.create(userData);
    }

    static async findUserById(id) {
        return await User.findByPk(id);
    }

    static async updateUser(id, updateData) {
        const user = await User.findByPk(id);
        if (user) {
            return await user.update(updateData);
        }   
        return null;
    }

    static async deleteUser(id) {
        const user = await User.findByPk(id);
        if (user) {
            await user.destroy();
            return true;
        }
        return false;
    }

    static async getAllUsers() {
        return await User.findAll();
    }

    
}

const cors = require('cors');
app.use(cors());
