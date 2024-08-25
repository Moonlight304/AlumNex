const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();

router.use(express.json({ limit: '10mb' }));
router.use(cookieParser());
router.use(cors({ origin: process.env.frontendURL, credentials: true }));

const authMiddle = require('../middleware/authMiddle.js');
const { Student, Alumni } = require('../models/db.js');

router.get('/', authMiddle, async (req, res) => {
    try {
        const topDonors = await Alumni.find().sort({ donation : -1 });

        return res.json({
            status: 'success',
            topDonors
        })
    }
    catch (e) {
        return res.status(500).json({
            status: 'fail',
            message: e.message
        });
    }
})

router.post('/makeDonation', authMiddle, async (req, res) => {
    try {
        const { userID, userType } = req.user;
        const { donationAmount } = req.body;

        if (userType !== 'Alumni')
            return res.json({
                status: 'fail',
                message: 'Only alumni can donate'
            })

        if (donationAmount <= 0)
            return res.json({
                status: 'fail',
                message: 'Invalid donation amount'
            })
        
        const user = await Alumni.findById(userID);

        if (!user)
            return res.json({
                status: 'fail',
                message: 'User doesn\'t exist'
            })

        user.donation += donationAmount;
        await user.save();

        return res.json({
            status: 'success',
            message: 'Donated successfully!'
        })
    }
    catch (e) {
        return res.status(500).json({
            status: 'fail',
            message: e.message
        });
    }
})

module.exports = router;