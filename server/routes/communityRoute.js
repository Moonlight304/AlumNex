const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();

router.use(express.json({ limit: '10mb' }));
router.use(cookieParser());
router.use(cors({ origin: process.env.frontendURL, credentials: true }));

const authMiddle = require('../middleware/authMiddle.js');
const { Student, Alumni, Community } = require('../models/db.js');

router.get('/', authMiddle, async (req, res) => {
    try {
        const filters = req.query.filters ? req.query.filters.split(',') : [];

        const filterQuery = {};
        if (filters.length) {
            filterQuery = { tag: { $in: filters } };
        }

        const allDiscussions = await Community.find(filterQuery).sort({ createdAt: -1 });

        return res.status(200).json({
            status: 'success',
            count: allDiscussions.length,
            data: allDiscussions,
        });
    }
    catch (e) {
        return res.status(500).json({
            status: 'fail',
            message: e.message
        });
    }
})

router.post('/newCommunityPost', authMiddle, async (req, res) => {
    try {
        const { userID, username, userType} = req.user;
        const { content, tag } = req.body;

        if (!userID || !username || !userType)
            return res.json({
                status: 'fail',
                message: 'Please login again.',
            });

        if (!content || !tag)
            return res.json({
                status: 'fail',
                message: 'Please specify all fields.',
            });

        const newCommunityPost = new Community({ userID, username, content, tag });
        const savedCommunityPost = await newCommunityPost.save();

        const user = await (userType === 'Student' ? Student : Alumni).findById(userID);

        if (!user) {
            return res.json({
                status: 'fail',
                message: 'User not found.',
            });
        }
        
        user.jobs.push(savedCommunityPost._id);
        await user.save();

        return res.json({
            status: 'success',
            message: 'Posted successfully',
        });
    } 
    catch (e) {
        return res.status(500).json({
            status: 'fail',
            message: e.message
        });
    }
});

module.exports = router