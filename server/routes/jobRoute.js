const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();

router.use(express.json({ limit: '10mb' }));
router.use(cookieParser());
router.use(cors({ origin: process.env.frontendURL, credentials: true }));

const authMiddle = require('../middleware/authMiddle.js');
const { Student, Alumni, Job } = require('../models/db.js');

router.get('/', authMiddle, async (req, res) => {
    try {
        const filters = req.query.filters ? req.query.filters.split(',') : [];

        const filterQuery = {};
        if (filters.length) {
            filterQuery = { tag: { $in: filters } };
        }

        const allJobs = await Job.find(filterQuery).sort({ createdAt: -1 });

        return res.json({
            status: 'success',
            count: allJobs.length,
            data: allJobs,
        });
    } 
    catch (e) {
        return res.status(500).json({
            status: 'fail',
            message: e.message
        });
    }
})

router.get('/mentors', authMiddle, async (req, res) => {
    try {
        const allMentors = await Alumni.find({ openToMentor : true })

        return res.json({
            status: 'success',
            count: allMentors.length,
            data: allMentors,
        });
    } 
    catch (e) {
        return res.status(500).json({
            status: 'fail',
            message: e.message
        });
    }
})

router.get('/:jobID', authMiddle, async (req, res) => {
    try {
        const { jobID } = req.params;

        if (!jobID)
            return res.json({
                status: 'fail',
                message: 'jobID is required',
            })

        const job = await Job.findById(jobID);

        if (!job)
            return res.json({
                status: 'fail',
                message: 'job not found',
            })

        return res.json({
            status: 'success',
            job: job,
        })
    }
    catch (e) {
        return res.status(500).json({
            status: 'fail',
            message: e.message
        });
    }
})

router.post('/newJob', authMiddle, async (req, res) => {
    try {
        const { userID, username, userType} = req.user;
        const { title, company, location, description, requirements, tag } = req.body;

        if (!userID || !username || !userType || !title || !company || !location || !description || !requirements || !tag)
            return res.json({
                status: 'fail',
                message: 'Please specify all fields.',
            });

        if (userType !== 'Alumni')
            return res.json({
                status: 'fail',
                message: 'Only Alumni can post jobs',
            })

        const newJob = new Job({ userID, username, title, company, location, description, requirements, tag });
        const savedJob = await newJob.save();

        const alumni = await Alumni.findById(userID);

        if (!alumni) {
            return res.json({
                status: 'fail',
                message: 'Alumni not found.',
            });
        }
        
        alumni.jobs.push(savedJob._id);
        await alumni.save();

        return res.json({
            status: 'success',
            message: 'Posted job successfully',
        });
    } 
    catch (e) {
        return res.status(500).json({
            status: 'fail',
            message: e.message
        });
    }
});

router.post('/editJob/:jobID', authMiddle, async (req, res) => {
    try {
        const { userID, userType} = req.user;
        const { jobID } = req.params;
        const { newTitle, newCompany, newLocation, newDescription, newTag } = req.body;
            
        if (!jobID)
            return res.json({
                status: 'fail',
                message: 'jobID is required',
            })

        if (!newTitle || !newCompany || !newLocation || !newDescription || !newTag) {
            return res.json({
                status: 'fail',
                message: 'Incomplete atrributes',
            })
        }

        if (userType !== 'Alumni')
            return res.json({
                status: 'fail',
                message: 'Only Alumni can edit jobs',
            })

        const job = await Job.findById(jobID);

        if (!job)
            return res.json({
                status: 'fail',
                message: 'job not found',
            })

        if (userID !== job.userID._id.toString())
            return res.json({
                status: 'fail',
                message: 'cannot edit others job posting',
            });

            
        job.title = newTitle;
        job.company = newCompany;
        job.location = newLocation;
        job.description = newDescription;
        job.tag = newTag;

        await job.save();

        return res.json({
            status: 'success',
            message: 'Edited Post',
        });
    }
    catch (e) {
        return res.status(500).json({
            status: 'fail',
            message: e.message
        });
    }
})

router.delete('/deleteJob/:jobID', authMiddle, async (req, res) => {
    try {
        const { userID, userType} = req.user;
        const { jobID } = req.params;

        if (!jobID)
            return res.json({
                status: 'fail',
                message: 'jobID is required',
            })

        const job = await Job.findById(jobID);

        if (!job)
            return res.json({
                status: 'fail',
                message: 'job not found',
            })

        if (userID !== job.userID._id.toString())
            return res.json({
                status: 'fail',
                message: 'cannot delete others job postings',
            })

        if (userType !== 'Alumni')
            return res.json({
                status: 'fail',
                message: 'Only Alumni can delete jobs',
            })

        await Job.deleteOne({ _id: jobID });

        await Alumni.updateOne(
            { _id: userID },
            { $pull: { jobs: jobID } }
        );

        return res.json({
            status: 'success',
            message: 'deleted job successfully',
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