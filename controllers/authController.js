import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

export async function register(req, res) {
    try {
        const userData = req.body;
        const hashedPassword = await bcrypt.hash(userData.password, 7);

        await userModel.create({
            username: userData.username,
            email: userData.email,
            password: hashedPassword
        });

        return res.status(201).json({ success: true, message: "User registered" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Error registering user" });
    }
}

export async function login(req, res) {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { username: user.username, id: user._id.toString() },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.json(token);


        return res.json({ success: true, message: "Login successful", token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Error logging in" });
    }
}
