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

        let filterQuery = {};
        if (filters.length) {
            filterQuery = { tag: { $in: filters } };
        }

        const allEvents = await Event.find(filterQuery).sort({ createdAt: -1 });

        return res.json({
            status: 'success',
            count: allEvents.length,
            data: allEvents,
        });
    }
    catch (e) {
        return res.json({
            status: 'fail',
            message: e.message
        });
    }
})

router.get('/:eventID', authMiddle, async (req, res) => {
    try {
        const { eventID } = req.params;
        
        if (!eventID)
            return res.json({
                status: 'fail',
                message: 'eventID not found'
            })

        const event = await Event.findById(eventID);
        if (!event)
            return res.json({
                status: 'fail',
                message: 'Event not found'
            })

        return res.json({
            status: 'success',
            data: event
        });
    }
    catch (e) {
        return res.json({
            status: 'fail',
            message: e.message
        });
    }
})

router.post('/newEvent', authMiddle, async (req, res) => {
    try {
        const { userID } = req.user;
        const { name, start, end, venue, description, schedule, tag, speakers, sponsors } = req.body;

        if (!name || !start || !end || !venue || !description || !schedule || !tag)
            return res.json({
                status: 'fail',
                message: 'Incomplete attributes'
            })

        
        const user = await (userType === 'Student' ? Student : Alumni).findById(userID);
        if (!user)
            return res.json({
                status: 'fail',
                message: 'User not found'
            })

        const event = new Event({ userID, name, start, end, venue, description, schedule, tag, speakers, sponsors });
        const savedEvent = await event.save();

        user.events.push(savedEvent._id);
        await user.save();

        return res.json({
            status: 'success',
            message: 'Created a new event',
            data: savedEvent._id
        })
    }
    catch (e) {
        return res.json({
            status: 'fail',
            message: e.message
        });
    }
})

router.post('/editEvent/:eventID', authMiddle, async (req, res) => {
    try {
        const { eventID } = req.params;
        const { name, start, end, venue, description, schedule, tag, speakers, sponsors } = req.body;

        if (!name || !start || !end || !venue || !description || !schedule || !tag)
            return res.json({
                status: 'fail',
                message: 'Incomplete attributes'
            })

        if (!eventID)
            return res.json({
                status: 'fail',
                message: 'eventID not specified'
            })

        const existingEvent = await Event.findById(eventID);

        if (!existingEvent)
            return res.json({
                status: 'fail',
                message: 'Event not found'
            })

        existingEvent.name = name;
        existingEvent.start = start;
        existingEvent.end = end;
        existingEvent.venue = venue;
        existingEvent.description = description;
        existingEvent.schedule = schedule;
        existingEvent.tag = tag;
        existingEvent.speakers = speakers;
        existingEvent.sponsors = sponsors;

        await existingEvent.save();

        return res.json({
            status: 'success',
            message: 'Edited event'
        })
    }
    catch (e) {
        return res.json({
            status: 'fail',
            message: e.message
        });
    }
})

router.delete('/deleteEvent/:eventID', authMiddle, async (req, res) => {
    try {
        const { userID, userType } = req.user;
        const { eventID } = req.params;

        if (!eventID)
            return res.json({
                status: 'fail',
                message: 'eventID is required',
            })

        const event = await Event.findById(feedPostID);

        if (!event)
            return res.json({
                status: 'fail',
                message: 'event not found',
            })

        const UserModel = userType === 'Student' ? Student : Alumni;    
        const user = await UserModel.findById(userID);
        if (!user)
            return res.json({
                status: 'fail',
                message: 'User not found'
            })

        if (userID !== event.userID._id.toString())
            return res.json({
                status: 'fail',
                message: 'cannot delete event. Not authorised',
            })

        await Event.deleteOne({ _id: eventID });

        await UserModel.updateOne(
            { _id: userID },
            { $pull: { events: eventID } }
        );

        return res.json({
            status: 'success',
            message: 'deleted event successfully',
        })
    }
    catch (e) {
        return res.json({
            status: 'fail',
            message: e.message
        });
    }
})

router.get('/joinEvent/:eventID', authMiddle, async (req, res) => {
    try {
        const { userID, username, userType } = req.user;
        const { eventID } = req.params;

        if (!userID || !username || !userType) {
            return res.json({
                status: 'fail',
                message: 'Authentication failed. Please log in again.',
            });
        }

        const UserModel = userType === 'Student' ? Student : Alumni;
        const user = await UserModel.findById(userID);
        if (!user)
            return res.json({
                status: 'fail',
                message: 'User not found'
            })

        const event = await Event.findById(eventID);
        if (!event)
            return res.json({
                status: 'fail',
                message: 'event not found'
            })

        if (event.enrolled.includes(userID))
            return res.json({
                status: 'fail',
                message: 'Already enrolled in event',
            })
        
        await Event.updateOne(
            { _id: eventID },
            {
                $push: { enrolled: userID },
                $inc: { enrolledCount: 1 },
            }
        );

        await UserModel.updateOne(
            { _id: userID },
            { $push: { events: eventID } }
        );

        return res.json({
            status: 'success',
            message: 'Enrolled in event'
        });
    } 
    catch (e) {
        return res.json({
            status: 'fail',
            message: e.message,
        });
    }
})

router.get('/leaveEvent/:eventID', authMiddle, async (req, res) => {
    try {
        const { userID, username, userType } = req.user;
        const { eventID } = req.params;

        if (!userID || !username || !userType)
            return res.json({
                status: 'fail',
                message: 'Authentication failed. Please log in again.',
            });

        const UserModel = userType === 'Student' ? Student : Alumni;
        const user = await UserModel.findById(userID);
        if (!user)
            return res.json({
                status: 'fail',
                message: 'User not found'
            })

        if (!eventID)
            return res.json({
                status: 'fail',
                message: 'eventID not specified'
            })

        const event = await Event.findById(eventID);
        if (!event)
            return res.json({
                status: 'fail',
                message: 'event not found'
            })

        if (!event.enrolled.includes(userID))
            return res.json({
                status: 'fail',
                message: 'didnt enroll in event',
            })

        await Event.updateOne(
            { _id: eventID },
            {
                $pull: { enrolled: userID },
                $inc: { enrolledCount: -1 },
            }
        );

        await UserModel.updateOne(
            { _id: userID },
            { $pull: { enrolled: eventID } }
        );

        return res.json({
            status: 'success',
            message: 'disenrolled from event'
        });
    } 
    catch (e) {
        return res.json({
            status: 'fail',
            message: e.message,
        });
    }
})

module.exports = router