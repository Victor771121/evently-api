import AuthService from "./auth.service.js";
import createSendToken from "../../lib/jwt/jwt_helper.js";
import bcrypt from "bcryptjs";

export default class AuthController {
    static async signUp(req, res) {
        try {
            if (!req.body || typeof req.body !== 'object' || Object.keys(req.body).length === 0) {
                return res.status(400).json({ message: 'Bad request: request body is missing or empty' });
            }

            const { firstName, lastName, email, password } = req.body || {};
            const existingUser = await AuthService.findUserByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: 'Email already in use' });
            }
            const hashedPassword = bcrypt.hashSync(password, 12)
            const newUser = await AuthService.createUser({ firstName, lastName, email, password: hashedPassword });
            // return res.status(201).json({ message: 'User created successfully', user: newUser });
            return createSendToken(newUser, 201, res);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }


    }

    static async login(req, res) {
        try {
            if (!req.body || typeof req.body !== 'object' || Object.keys(req.body).length === 0) {
                return res.status(400).json({ message: 'Bad request: request body is missing or empty' });
            }

            const { email, password } = req.body || {};

            if (!email || !password) {
                return res.status(400).json({ message: 'Bad request: email and password are required' });
            }

            const user = await AuthService.findUserByEmail(email);
            if (!user) {
                return res.status(401).json({ message: 'Incorrect login details' });
            }

            const isPasswordCorrect = bcrypt.compareSync(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(401).json({ message: 'Incorrect login details' });
            }

            return createSendToken(user, 200, res);
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
            const users = await AuthService.getAllUsers()
            return res.status(200).json({ message: 'successful!', users });

        } catch (error) {
            return res.status(500).json({ message: 'internal server error', error: error.message })
        }

    }

    static async updateUser(req, res) {
        try {
            if (!req.body || typeof req.body !== 'object' || Object.keys(req.body).length === 0) {
                return res.status(400).json({ message: 'Bad request: request body is missing or empty' });
            }

            const { firstName, lastName, email } = req.body || {};
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