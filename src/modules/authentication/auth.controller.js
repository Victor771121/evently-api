import AuthService from "./auth.service.js";

export default class AuthController {
    static async signUp(req, res) {
        try {
            const { firstName, lastName, email, password } = req.body;
            const existingUser = await AuthService.findUserByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: 'Email already in use' });
            }
            const newUser = await AuthService.createUser({ firstName, lastName, email, password });
            return res.status(201).json({ message: 'User created successfully', user: newUser });
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }


    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            console.log(req.body)
            const user = await AuthService.findUserByEmail(email);
            if (!user) {
                return res.status(200).json({ message: 'Incorrect login details', error: error.message });
            }
            return res.status(201).json({ message: 'login successful!', user: user });
        } catch (error) {
            return res.status(500).json({ message: 'internal server error', error: error.message });
        }
    }

    static async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await AuthService.findUserById(id)
            if (!user) {
                return res.status(404).json({ message: 'user not found' })
            }
            return res.status(200).json({ message: 'successful!', user: user });
        } catch (error) {
            return res.status(500).json({ message: 'internal server error', error: error.message })
        }
    }

    static async getAllUsers(req, res) {
        try {
            const { id } = req.params;
            const user = await AuthService.getAllUsers()
            return res.status(200).json({ message: 'successful!', user: user });

        } catch (error) {
            return res.status(500).json({ message: 'internal server error', error: error.message })
        }

    }

    static async updateUser(req, res) {
        try {
            const { firstName, lastName, email } = req.body;
            const { id } = req.params;
            const updatedUser = {
                firstName: firstName,
                lastName: lastName,
                email: email
            }
            const User = await AuthService.updateUser(id, updatedUser);
            if (!User) {
                return res.status(404).json({ message: 'user not found' })
            }
            return res.status(200).json({ message: 'successful!', user: User });
        } catch (error) {
            return res.status(500).json({ message: 'internal server error', error: error.message })
        }
    }

    static async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const user = await AuthService.deleteUser(id)
            if (!user) {
                return res.status(404).json({ message: 'user not found' })
            }
            return res.status(200).json({ message: 'successful!', user: user });
        } catch (error) {
            return res.status(500).json({ message: 'internal server error', error: error.message })
        }
    }
}