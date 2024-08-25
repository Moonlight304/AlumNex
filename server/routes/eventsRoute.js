const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();

router.use(express.json({ limit: '10mb' }));
router.use(cookieParser());
router.use(cors({ origin: process.env.frontendURL, credentials: true }));

const authMiddle = require('../middleware/authMiddle.js');
const { Student, Alumni, Event } = require('../models/db.js');

router.get('/', authMiddle, async (req, res) => {
    try {
        const filters = req.query.filters ? req.query.filters.split(',') : [];

        const filterQuery = {};
        if (filters.length) {
            filterQuery = { tag: { $in: filters } };
        }

        const allEvents = await Event.find(filterQuery).sort({ createdAt: -1 });

        return res.status(200).json({
            status: 'success',
            count: allEvents.length,
            data: allEvents,
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