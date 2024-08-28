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
const { Student, Alumni } = require('../models/db.js');

router.get('/follow/:destUserType/:destUserID', authMiddle, async (req, res) => {
    try {
        const { userID, userType } = req.user;
        const { destUserType, destUserID } = req.params;

        if (!destUserID || !destUserType)
            return res.status(404).json({
                status: 'fail',
                message: 'destination params not found'
            })

        const srcUserModel = userType === 'Student' ? Student : Alumni;
        const DestUserModel = destUserType === 'Student' ? Student : Alumni;
        
        const srcUser = await srcUserModel.findById(userID);
        const destUser = await DestUserModel.findById(destUserID);

        if (!srcUser || !destUser) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        if (destUser.followers !== undefined && destUser.followers.includes(userID))
            return res.json({
                status: 'fail',
                message: 'Already following user',
            })

        
        srcUser.following.push(destUserID);
        srcUser.followingCount += 1;
        
        destUser.followers.push(userID);
        destUser.followersCount += 1;

        await srcUser.save();
        await destUser.save();

        return res.status(200).json({
            status: 'success',
            message: 'Followed user'
        })
    }
    catch (e) {
        res.status(500).json({
            status: 'fail',
            message: e.message
        })
    }
})

router.get('/unfollow/:destUserType/:destUserID', authMiddle, async (req, res) => {
    try {
        const { userID, userType } = req.user;
        const { destUserType, destUserID } = req.params;

        if (!destUserID || !destUserType)
            return res.status(404).json({
                status: 'fail',
                message: 'destination params not found'
            })

        const srcUserModel = userType === 'Student' ? Student : Alumni;
        const DestUserModel = destUserType === 'Student' ? Student : Alumni;
        
        const srcUser = await srcUserModel.findById(userID);
        const destUser = await DestUserModel.findById(destUserID);

        if (!srcUser || !destUser) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        if (destUser.followers === undefined)
            return res.status(400).json({
                status: 'fail',
                message: 'already unfollowed',
            })

        if (!destUser.followers.includes(userID))
            return res.status(400).json({
                status: 'fail',
                message: 'not following user',
            })

        
        srcUser.following = srcUser.following.filter(id => id.toString() !== destUserID);
        srcUser.followingCount -= 1;

        destUser.followers = destUser.followers.filter(id => id.toString() !== userID);
        destUser.followersCount -= 1;

        await srcUser.save();
        await destUser.save();

        return res.status(200).json({
            status: 'success',
            message: 'Followed user'
        })
    }
    catch (e) {
        res.status(500).json({
            status: 'fail',
            message: e.message
        })
    }
})

router.get('/getIsFollowing/:destUserType/:destUserID', authMiddle, async (req, res) => {
    try {
        const { userType, userID } = req.user;
        const { destUserType, destUserID } = req.params;

        if (!destUserType || !destUserID)
            return res.status(404).json({
                status: 'fail',
                message: 'destination parameters not found'
            })

        const srcUserModel = userType === 'Student' ? Student : Alumni;
        const DestUserModel = destUserType === 'Student' ? Student : Alumni;
        
        const srcUser = await srcUserModel.findById(userID);
        const destUser = await DestUserModel.findById(destUserID);

        if (!srcUser || !destUser) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        if (destUser.followers !== undefined && destUser.followers.includes(userID))
            return res.status(200).json({
                status: 'success',
                message: JSON.stringify(true),
            })
        else 
            return res.status(200).json({
                status: 'success',
                message: JSON.stringify(false),
            })
    }
    catch (e) {
        res.status(500).json({
            status: 'fail',
            message: e.message,
        })
    }
})

router.post('/editProfile', authMiddle, async (req, res) => {
    try {
        const { userID, userType } = req.user;
        const { email, branch, gradYear, openToMentor, mentorPitch } = req.body;

        if (!email || (userType === 'Student' && !branch) || (userType === 'Alumni' && (!gradYear || !openToMentor || !mentorPitch))) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please specify all required fields.',
            });
        }

        const UserModel = userType === 'Student' ? Student : Alumni;
        const user = await UserModel.findById(userID);
        
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found.',
            });
        }

        const additionalData = userType === 'Student'
            ? { branch }
            : { gradYear, openToMentor, mentorPitch };

        
        // Update the user with new data
        const updatedUser = await UserModel.findByIdAndUpdate(
            userID,
            {
                email,
                ...additionalData,
            },
            { new: true, runValidators: true } // Return the updated document
        );

        // Return success response
        return res.status(200).json({
            status: 'success',
            message: 'Profile updated successfully.',
            data: updatedUser,
        });
        
    } 
    catch (e) {
        return res.status(500).json({
            status: 'fail',
            message: e.message
        });
    }
})

router.delete('/deleteProfile', authMiddle, async (req, res) => {
    try {
        const { userID, userType } = req.user;

        const UserModel = userType === 'Student' ? Student : Alumni;
        await UserModel.findByIdAndDelete(userID);

        return res.status(200).json({
            status: 'success',
            message: 'Deleted account',
        })
    }
    catch (e) {
        return res.status(500).json({
            status: 'fail',
            message: e.message,
        })
    }
})

router.get('/:userType/:userID', authMiddle, async (req, res) => {
    try {
        const { userType, userID } = req.params;

        if (!userID || !['Student', 'Alumni'].includes(userType)) {
            return res.status(400).json({
                status: 'fail',
                message: 'Incomplete parameters',
            });
        }


        const UserModel = userType === 'Student' ? Student : Alumni;
        const user = await UserModel.findById(userID);
        
        if (!user)
            return res.status(404).json({
                status: 'fail',
                message: 'User not found',
            });


        return res.status(200).json({
            status: 'success',
            user: user
        });
    } catch (e) {
        return res.status(500).json({
            status: 'fail',
            message: e.message
        });
    }
});

module.exports = router;