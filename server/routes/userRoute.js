const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

router.use(express.json({ limit: '10mb' }));
router.use(cookieParser());
router.use(cors({ origin: process.env.frontendURL, credentials: true }));

const authMiddle = require('../middleware/authMiddle.js');
const { Student, Alumni, FeedPost } = require('../models/db.js');

router.get('/:userID', authMiddle, async (req, res) => {
    try {
        const { userID } = req.params;

        if (!userID) {
            return res.status(400).json({
                status: 'fail',
                message: 'userID is required',
            });
        }

        // Attempt to find the user in either model

        const student = await Student.findById(userID);
        if (student) {
            return res.status(200).json({
                status: 'success',
                user: student,
            });
        }

        const alumni = await Alumni.findById(userID);
        if (alumni) {
            return res.status(200).json({
                status: 'success',
                user: alumni,
            });
        }

        return res.status(404).json({
            status: 'fail',
            message: 'User not found',
        });
    } catch (e) {
        return res.status(500).json({
            status: 'fail',
            message: e.message
        });
    }
});

router.post('/editProfile', authMiddle, async (req, res) => {
    try {
        const { userID, username, userType } = req.user;

        const UserModel = userType === 'Student' ? Student : Alumni;
        const user = await UserModel.findById(userID);

        if (!user)
            return res.status(404).json({
                status: 'fail',
                message: 'User not found',
            });
        
        
        
    } 
    catch (e) {
        return res.status(500).json({
            status: 'fail',
            message: e.message
        });
    }
})


module.exports = router;