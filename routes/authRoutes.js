import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const router = express.Router();

// Register Route
router.post("/auth/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Check if user exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });

        // Save new user (password is automatically hashed in the model)
        user = new User({ name, email, password });
        await user.save();
        
        res.status(201).json({ msg: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login Route
router.post("/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check user
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        console.log("Hashed Password: " + user.password);
        console.log("User Input Password: " + password);

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        // Generate JWT Token
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });

        res.json({ token });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;