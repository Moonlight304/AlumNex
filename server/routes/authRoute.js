const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');

JWT_SECRET = process.env.JWT_SECRET_CODE

router.use(express.json({ limit: '10mb' }));
router.use(cookieParser());
router.use(cors({ origin: process.env.frontendURL, credentials: true }));

const authMiddle = require('../middleware/authMiddle.js');
const { Student, Alumni } = require('../models/db.js');

router.post('/signup', async (req, res) => {
    try {
        const { userType, username, password, confirmPassword, email, branch, gradYear, openToMentor, mentorPitch } = req.body;

        if (!userType || !username || !password || !confirmPassword || !email || (userType === 'Student' && !branch) || (userType === 'Alumni' && !gradYear)) {
            return res.json({
                status: 'fail',
                message: 'Please specify all required fields.',
            });
        }

        if (!['Student', 'Alumni'].includes(userType)) {
            return res.json({
                status: 'fail',
                message: 'Invalid user type. Must be either "Student" or "Alumni".',
            });
        }

        if (password !== confirmPassword) {
            return res.json({
                status: 'fail',
                message: 'Passwords do not match.',
            });
        }

        const UserModel = userType === 'Student' ? Student : Alumni;
        const additionalData = userType === 'Student' ? { branch } : { gradYear, openToMentor, mentorPitch };

        const existingUser = await UserModel.findOne({ username });

        if (existingUser) {
            return res.json({
                status: 'fail',
                message: 'User already exists.',
            });
        }

        // Encrypting password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new UserModel({ username, passwordHash, email, ...additionalData });
        const savedUser = await newUser.save();

        // Sign the token
        const jwt_token = jwt.sign(
            {
                userID: savedUser._id,
                username: savedUser.username,
                userType,
            },
            JWT_SECRET
        );

        return res.json({
            status: 'success',
            message: 'Signup successful.',
            jwt_token,
        });
    }
    catch (e) {
        return res.status(500).json({
            status: 'fail',
            message: e.message
        });
    }
})

//log in
router.post('/login', async (req, res) => {
    try {
        const { userType, username, password } = req.body;

        if (!userType || !username || !password) {
            return res.json({
                status: 'fail',
                message: 'Please specify all fields.',
            });
        }

        const UserModel = userType === 'Student' ? Student : userType === 'Alumni' ? Alumni : null;

        if (!UserModel) {
            return res.json({
                status: 'fail',
                message: 'Invalid user type. Please specify either "Student" or "Alumni".',
            });
        }

        const existingUser = await UserModel.findOne({ username: username });

        if (!existingUser) {
            return res.json({
                status: 'fail',
                message: 'Username or Password invalid.',
            });
        }

        const passwordValid = await bcrypt.compare(password, existingUser.passwordHash);

        if (!passwordValid) {
            return res.json({
                status: 'fail',
                message: 'Username or Password invalid.',
            });
        }

        // Sign the token
        const jwt_token = jwt.sign(
            {
                userID: existingUser._id,
                username: existingUser.username,
                userType,
            },
            JWT_SECRET
        );

        return res.json({
            status: 'success',
            message: 'Logged in successfully',
            jwt_token,
        });

    }
    catch (e) {
        return res.status(500).json({
            status: 'fail',
            message: e.message
        });
    }
});

//log out
router.get('/logout', authMiddle, (req, res) => {
    try {
        return res.json({
            status: 'success',
            message: 'Logged out',
        });
    }
    catch (e) {
        return res.status(500).json({
            status: 'fail',
            message: e.message
        });
    }
})

module.exports = router