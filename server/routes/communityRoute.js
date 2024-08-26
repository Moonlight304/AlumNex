const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();

router.use(express.json({ limit: '10mb' }));
router.use(cookieParser());
router.use(cors({ origin: process.env.frontendURL, credentials: true }));

const authMiddle = require('../middleware/authMiddle.js');
const { Student, Alumni, Community, CommunityPost } = require('../models/db.js');

const communityPostsRoute = require('./communityPostsRoute.js');

router.get('/', authMiddle, async (req, res) => {
    try {
        const { userID, username, userType } = req.user;

        if (!userID || !username || !userType)
            return res.status(401).json({
                status: 'fail',
                message: 'Please login again',
            })

        const user = await (userType === 'Student' ? Student : Alumni).findById(userID);
        
        if (!user)
            return res.status(404).json({
                status: 'fail',
                message: 'User not found',
            })

        return res.status(200).json({
            status: 'success',
            count : user.communities.count,
            data : user.communities,
        })
    }
    catch (e) {
        return res.status(500).json({
            status: 'fail',
            message: e.message
        });
    }
})

// view community
router.get('/:communityID', authMiddle, async (req, res) => {
    try {
        const { userID, username, userType } = req.user;
        const { communityID } = req.params;

        if (!userID || !username || !userType)
            return res.status(401).json({
                status: 'fail',
                message: 'Please login again',
            })
        
        if (!communityID)
            return res.status(400).json({
                status: 'fail',
                message: 'communityID not valid'
            })

        const community = await Community.findById(communityID);
        if (!community)
            return res.status(404).json({
                status: 'fail',
                message: 'community not found'
            })

        return res.status(200).json({
            status: 'success',
            data : community
        })
    }
    catch (e) {
        return res.status(500).json({
            status: 'fail',
            message: e.message
        });
    }
})

// create new community
router.post('/newCommunity', authMiddle, async (req, res) => {
    try {
        const { userID, username, userType } = req.user;
        const { name, description } = req.body;

        if (!userID || !username || !userType) {
            return res.status(401).json({
                status: 'fail',
                message: 'Authentication failed. Please log in again.',
            });
        }

        const user = await (userType === 'Student' ? Student : Alumni).findById(userID);
        if (!user)
            return res.status(404).json({
                status: 'fail',
                message: 'User doesnt exist'
            })

        if (!name || !description) {
            return res.status(400).json({
                status: 'fail',
                message: 'Incomplete attributes',
            });
        }

        const existingCommunity = await Community.findOne({ name });
        if (existingCommunity) {
            return res.status(409).json({
                status: 'fail',
                message: 'A community with this name already exists.',
            });
        }

        const newCommunity = new Community({userType, userID, createdBy: username, name, description, members: [userID], memberCount: 1});
        await newCommunity.save();

        user.communities.unshift(newCommunity._id);
        await user.save();

        return res.status(200).json({
            status: 'success',
            data: newCommunity._id,
        });
    } catch (e) {
        return res.status(500).json({
            status: 'fail',
            message: e.message || 'An unexpected error occurred.',
        });
    }
})

// edit existing community
router.post('/editCommunity/:communityID', authMiddle, async (req, res) => {
    try {
        const { userID, username, userType } = req.user;
        const { communityID } = req.params;
        const { newName, newDescription } = req.body;

        if (!userID || !username || !userType) {
            return res.status(401).json({
                status: 'fail',
                message: 'Authentication failed. Please log in again.',
            });
        }

        if (!newName || !newDescription) {
            return res.status(400).json({
                status: 'fail',
                message: 'Incomplete attributes',
            });
        }

        const community = await Community.findById(communityID);
        if (!community)
            return res.status(404).json({
                status: 'fail',
                message: 'community not found'
            })

        community.name = newName;
        community.description = newDescription;
        await community.save();

        return res.status(201).json({
            status: 'success',
            data: community._id,
        });
    } catch (e) {
        return res.status(500).json({
            status: 'fail',
            message: e.message || 'An unexpected error occurred.',
        });
    }
})

// join a community
router.get('/joinCommunity/:communityID', authMiddle, async (req, res) => {
    try {
        const { userID, username, userType } = req.user;
        const { communityID } = req.params;

        if (!userID || !username || !userType) {
            return res.status(401).json({
                status: 'fail',
                message: 'Authentication failed. Please log in again.',
            });
        }

        const community = await Community.findById(communityID);
        if (!community)
            return res.status(404).json({
                status: 'fail',
                message: 'community not found'
            })

        if (community.members.includes(userID))
            return res.status(409).json({
                status: 'fail',
                message: 'Already joined the community',
            })
        
        await Community.updateOne(
            { _id: communityID },
            {
                $push: { members: userID },
                $inc: { memberCount: 1 },
            }
        );

        const UserModel = userType === 'Student' ? Student : Alumni;
        await UserModel.updateOne(
            { _id: userID },
            { $push: { communities: communityID } }
        );
        

        return res.status(201).json({
            status: 'success',
            message: 'Joined community'
        });
    } catch (e) {
        return res.status(500).json({
            status: 'fail',
            message: e.message || 'An unexpected error occurred.',
        });
    }
})

// leave a community
router.get('/leaveCommunity/:communityID', authMiddle, async (req, res) => {
    try {
        const { userID, username, userType } = req.user;
        const { communityID } = req.params;

        if (!userID || !username || !userType) {
            return res.status(401).json({
                status: 'fail',
                message: 'Authentication failed. Please log in again.',
            });
        }

        const community = await Community.findById(communityID);
        if (!community)
            return res.status(404).json({
                status: 'fail',
                message: 'community not found'
            })

        if (!community.members.includes(userID))
            return res.status(409).json({
                status: 'fail',
                message: 'Not part of community',
            })

        await Community.updateOne(
            { _id: communityID },
            {
                $pull: { members: userID },
                $inc: { memberCount: -1 },
            }
        );

        const UserModel = userType === 'Student' ? Student : Alumni;
        await UserModel.updateOne(
            { _id: userID },
            { $pull: { communities: communityID } }
        );

        return res.status(200).json({
            status: 'success',
            message: 'Left community'
        });
    } catch (e) {
        return res.status(500).json({
            status: 'fail',
            message: e.message || 'An unexpected error occurred.',
        });
    }
})

// router for community posts
router.use('/posts', communityPostsRoute);

module.exports = router