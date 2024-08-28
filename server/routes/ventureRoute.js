const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();

router.use(express.json({ limit: '10mb' }));
router.use(cookieParser());
router.use(cors({ origin: process.env.frontendURL, credentials: true }));

const authMiddle = require('../middleware/authMiddle.js');
const { Student, Alumni, Venture } = require('../models/db.js');

router.get('/', authMiddle, async (req, res) => {
    try {
        const allData = await Venture.find().sort({ likeCount : -1 });

        return res.json({
            status: 'success',
            data: allData
        });
    } 
    catch (e) {
        return res.status(500).json({
            status: 'fail',
            message: e.message
        });
    }
})

router.get('/myVentures', authMiddle, async (req, res) => {
    try {
        const { userID, userType } = req.user;

        if (userType !== 'Student')
            return res.status(400).json({
                status: 'fail',
                message: 'Only students can access their ventures'
            })

        const student = await Student.findById(userID);
        if (!student)
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            })

        const myVentures = student.ventures;

        return res.status(200).json({
            status: 'success',
            data: myVentures
        });
    } 
    catch (e) {
        return res.status(500).json({
            status: 'fail',
            message: e.message
        });
    }
})

router.get('/:ventureID', authMiddle, async (req, res) => {
    try {
        const { ventureID } = req.params;

        const venture = await Venture.findById(ventureID);
        if (!venture)
            return res.status(404).json({
                status: 'fail',
                message: 'Venture not found'
            })


        return res.json({
            status: 'success',
            data: venture
        });
    } 
    catch (e) {
        return res.status(500).json({
            status: 'fail',
            message: e.message
        });
    }
})

router.post('/newVenture', authMiddle, async (req, res) => {
    try {
        const { userID, username, userType } = req.user;
        const { title, description } = req.body;

        if (userType !== 'Student')
            return res.status(400).json({
                status: 'fail',
                message: 'Only students can start ventures'
            })

        const venture = new Venture({userID, username, title, description });
        const savedVenture = await venture.save();

        const userResult = await Student.updateOne(
            { _id : userID },
            { $push : { ventures : savedVenture._id} }
        )

        if (userResult.matchedCount === 0)
            return res.status(404).json({
              status: 'fail',
              message: 'User not found',
            });

        return res.json({
            status: 'success',
            data: venture
        });
    } 
    catch (e) {
        return res.status(500).json({
            status: 'fail',
            message: e.message
        });
    }
})

router.post('/editVenture/:ventureID', authMiddle, async (req, res) => {
    try {
        const { userID, username, userType } = req.user;
        const { ventureID } = req.params;
        const { title, description } = req.body;

        const ventureResult = await Venture.updateOne(
            { _id: ventureID },
            { title: title, description: description }
        )
        if (ventureResult.matchedCount === 0)
            return res.status(404).json({
              status: 'fail',
              message: 'Venture not found',
            });

        return res.status(201).json({
            status: 'success',
            message: 'edited venture'
        });
    } 
    catch (e) {
        return res.status(500).json({
            status: 'fail',
            message: e.message
        });
    }
})

router.delete('/deleteVenture/:ventureID', authMiddle, async (req, res) => {
    try {
        const { userID, username, userType } = req.user;
        const { ventureID } = req.params;

        const ventureResult = await Venture.deleteOne(
            { _id: ventureID }
        )
        if (ventureResult.deletedCount === 0)
            return res.status(404).json({
              status: 'fail',
              message: 'Venture not found',
            });

        const userResult = await Student.updateOne(
            { _id : userID },
            { $pull : { ventures : ventureID} }
        )
        if (userResult.matchedCount === 0)
            return res.status(404).json({
              status: 'fail',
              message: 'User not found',
            });

        return res.status(200).json({
            status: 'success',
            message: 'deleted venture'
        });
    } 
    catch (e) {
        return res.status(500).json({
            status: 'fail',
            message: e.message
        });
    }
})

router.get('/like/:ventureID', authMiddle, async (req, res) => {
    try {
        const { userID } = req.user;
        const { ventureID } = req.params;

        if (!ventureID)
            return res.json({
                status: 'fail',
                message: 'ventureID is required',
            });

        const venture = await Venture.findById(ventureID);

        if (!venture)
            return res.json({
                status: 'fail',
                message: 'venture not found',
            })

        if (venture.likes.includes(userID))
            return res.json({
                status: 'fail',
                message: 'Already liked',
            })

        //update likecount and like array in venture
        await Venture.updateOne(
            { _id: ventureID },
            {
                $push: { likes: userID },
                $inc: { likeCount: 1 },
            }
        );

        return res.json({
            status: 'success',
            message: 'Incremented like count',
            newLikeCount: venture.likeCount + 1,
        })
    }
    catch (e) {
        return res.status(500).json({
            status: 'fail',
            message: e.message
        });
    }
})

router.get('/dislike/:ventureID', authMiddle, async (req, res) => {
    try {
        const { userID } = req.user;
        const { ventureID } = req.params;

        if (!ventureID)
            return res.json({
                status: 'fail',
                message: 'ventureID is required',
            })

        const venture = await Venture.findById(ventureID);

        if (!venture)
            return res.json({
                status: 'fail',
                message: 'venture not found',
            })

        if (!venture.likes.includes(userID))
            return res.json({
                status: 'fail',
                message: 'You did not like the venture',
            })

        //update likecount and like array in venture
        await Venture.updateOne(
            { _id: ventureID },
            {
                $pull: { likes: userID },
                $inc: { likeCount: -1 },
            }
        );

        return res.json({
            status: 'success',
            message: 'Decremented like count',
            newLikeCount: venture.likeCount - 1,
        })
    }
    catch (e) {
        return res.status(500).json({
            status: 'fail',
            message: e.message
        });
    }
})

router.get('/:ventureID/checkLiked', authMiddle, async (req, res) => {
    try {
        const { userID } = req.user;
        const { ventureID } = req.params;

        if (!ventureID)
            return res.json({
                status: 'fail',
                message: 'ventureID not found',
            })

        if (!userID)
            return res.json({
                status: 'fail',
                message: 'userID not found',
            })

        const venture = await Venture.findById(ventureID);

        if (!venture)
            return res.json({
                status: 'fail',
                message: 'venture not found',
            })


        if (venture.likes.includes(userID))
            return res.json({
                status: 'success',
                liked: JSON.stringify(true),
            })
        else
            return res.json({
                status: 'success',
                liked: JSON.stringify(false),
            })
    }
    catch (e) {
        return res.status(500).json({
            status: 'fail',
            message: e.message
        });
    }
})

router.post('/invest/:ventureID', authMiddle, async (req, res) => {
    try {
        const { userID, userType } = req.user;
        const { ventureID } = req.params;
        const { investAmount } = req.body;

        // Only Alumni can invest
        if (userType !== 'Alumni') {
            return res.status(401).json({
                status: 'fail',
                message: 'Only Alumni can invest'
            });
        }

        // Validate input
        if (!ventureID || investAmount <= 0) {
            return res.status(400).json({
                status: 'fail',
                message: 'Incomplete attributes'
            });
        }

        // Check if the venture exists
        const venture = await Venture.findById(ventureID);
        if (!venture) {
            return res.status(404).json({
                status: 'fail',
                message: 'Venture not found'
            });
        }

        // Check if the alumni already invested in the venture
        const alumni = await Alumni.findById(userID);
        const existingInvestment = alumni.investments.find(
            investment => investment.venture.toString() === ventureID
        );

        if (existingInvestment) {
            // existing investment
            await Venture.updateOne(
                { _id: ventureID },
                {
                    $inc: { amountRaised: investAmount }
                }
            );

            await Alumni.updateOne(
                { _id: userID, 'investments.venture': ventureID },
                {
                    $inc: { 'investments.$.amountInvested': investAmount }
                }
            );
        } else {
            // new investment
            await Venture.updateOne(
                { _id: ventureID },
                {
                    $push: { investors: userID },
                    $inc: { investorCount: 1, amountRaised: investAmount }
                }
            );

            await Alumni.updateOne(
                { _id: userID },
                {
                    $push: {
                        investments: {
                            venture: ventureID,
                            amountInvested: investAmount
                        }
                    }
                }
            );
        }

        return res.status(201).json({
            status: 'success',
            message: 'Invested in venture'
        });
    } 
    catch (e) {
        return res.status(500).json({
            status: 'fail',
            message: e.message
        });
    }
});


module.exports = router;