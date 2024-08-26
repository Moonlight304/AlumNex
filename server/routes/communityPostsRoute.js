const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose')

router.use(express.json({ limit: '10mb' }));
router.use(cookieParser());
router.use(cors({ origin: process.env.frontendURL, credentials: true }));

const authMiddle = require('../middleware/authMiddle.js');
const { Student, Alumni, Community, CommunityPost } = require('../models/db.js');

// get all posts of a community
router.get('/:communityID/', authMiddle, async (req, res) => {
    try {
        const filters = req.query.filters ? req.query.filters.split(',') : [];
        const { communityID } = req.params;

        const filterQuery = { communityID };
        if (filters.length) {
            filterQuery = { tag: { $in: filters } };
        }

        const community = await Community.findById(communityID);
        if (!community)
            return res.status(404).json({
                status: 'fail',
                message: 'community not found'
            })
        
        const allPosts = await CommunityPost.find(filterQuery).sort({ createdAt: -1 });
        
        return res.status(200).json({
            status: 'success',
            count: allPosts.length,
            data: allPosts,
        });
    } 
    catch (e) {
        return res.status(500).json({
            status: 'fail',
            message: e.message
        });
    }
});


// CRUD

router.get('/:communityID/:communityPostID', authMiddle, async (req, res) => {
    try {
        const { communityPostID } = req.params;

        if (!communityPostID)
            return res.status(404).json({
                status: 'fail',
                message: 'communityPostID not found',
            })

        const post = await CommunityPost.findById(communityPostID);

        if (!post)
            return res.status(404).json({
                status: 'fail',
                message: 'post not found',
            })

        return res.status(200).json({
            status: 'success',
            post: post,
        })
    }
    catch (e) {
        return res.status(500).json({
            status: 'fail',
            message: e.message
        });
    }
})

router.post('/:communityID/newPost', authMiddle, async (req, res) => {
    try {
        const { userID, username, userType} = req.user;
        const { communityID } = req.params;
        const { content, tag } = req.body;

        if (!userID || !userType || !username || !content || !tag)
            return res.status(400).json({
                status: 'fail',
                message: 'Please specify all fields.',
            });

        if (!['Student', 'Alumni'].includes(userType)) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid userType specified.',
            });
        }

        const newPost = new CommunityPost({ communityID, userID, userType, username, content, tag });
        const savedPost = await newPost.save();

        const user = await (userType === 'Student' ? Student : Alumni).findById(userID);

        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found.',
            });
        }

        if (!user.communities.includes(communityID))
            return res.status(400).json({
                status: 'fail',
                message: 'Join community to post in it'
            })

        user.communityPosts.unshift(savedPost._id);
        await user.save();

        return res.status(200).json({
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

router.post('/:communityID/editPost/:communityPostID', authMiddle, async (req, res) => {
    try {
        const { userID, userType} = req.user;
        const { communityPostID } = req.params;
        const { newContent, newTag } = req.body;
        
        if (!communityPostID)
            return res.status(404).json({
                status: 'fail',
                message: 'communityPostID not found',
            })

        if (!newContent || !newTag) {
            return res.status(400).json({
                status: 'fail',
                message: 'Incomplete atrributes',
            })
        }

        const post = await CommunityPost.findById(communityPostID);

        if (!post)
            return res.status(404).json({
                status: 'fail',
                message: 'post not found',
            })

        if (userID !== post.userID._id.toString())
            return res.status(400).json({
                status: 'fail',
                message: 'cannot edit others posts',
            });

            
        post.content = newContent;
        post.tag = newTag;

        await post.save();

        return res.status(200).json({
            status: 'success',
            message: 'Edited CommunityPost',
        });
    }
    catch (e) {
        return res.status(500).json({
            status: 'fail',
            message: e.message
        });
    }
})

router.delete('/:communityID/deletePost/:communityPostID', authMiddle, async (req, res) => {
    try {
        const { userID, userType} = req.user;
        const { communityPostID } = req.params;

        if (!communityPostID)
            return res.status(404).json({
                status: 'fail',
                message: 'communityPostID not found',
            })

        const post = await CommunityPost.findById(communityPostID);

        if (!post)
            return res.status(404).json({
                status: 'fail',
                message: 'post not found',
            })

        if (userID !== post.userID._id.toString())
            return res.status(400).json({
                status: 'fail',
                message: 'cannot delete others posts',
            })

        await CommunityPost.deleteOne({ _id: communityPostID });

        const UserModel = userType === 'Student' ? Student : Alumni;

        await UserModel.updateOne(
            { _id: userID },
            { $pull: { communityPosts: communityPostID } }
        );

        return res.status(200).json({
            status: 'success',
            message: 'deleted post successfully',
        })
    }
    catch (e) {
        return res.status(500).json({
            status: 'fail',
            message: e.message
        });
    }
})


// like and dislike

router.get('/:communityID/like/:communityPostID', authMiddle, async (req, res) => {
    try {
        const { userID } = req.user;
        const { communityPostID } = req.params;

        if (!communityPostID)
            return res.status(404).json({
                status: 'fail',
                message: 'communityPostID not found',
            });

        const post = await CommunityPost.findById(communityPostID);

        if (!post)
            return res.status(404).json({
                status: 'fail',
                message: 'post not found',
            })

        if (post.likes.includes(userID))
            return res.status(400).json({
                status: 'fail',
                message: 'Already liked',
            })

        //update likecount and like array in post
        await CommunityPost.updateOne(
            { _id: communityPostID },
            {
                $push: { likes: userID },
                $inc: { likeCount: 1 },
            }
        );

        return res.status(200).json({
            status: 'success',
            message: 'Incremented like count',
            newLikeCount: post.likeCount + 1,
        })
    }
    catch (e) {
        return res.status(500).json({
            status: 'fail',
            message: e.message
        });
    }
})

router.get('/:communityID/dislike/:communityPostID', authMiddle, async (req, res) => {
    try {
        const { userID } = req.user;
        const { communityPostID } = req.params;

        if (!communityPostID)
            return res.status(400).json({
                status: 'fail',
                message: 'communityPostID is required',
            })

        const post = await CommunityPost.findById(communityPostID);

        if (!post)
            return res.status(404).json({
                status: 'fail',
                message: 'post not found',
            })

        if (!post.likes.includes(userID))
            return res.status(400).json({
                status: 'fail',
                message: 'You did not like the post',
            })

        //update likecount and like array in post
        await CommunityPost.updateOne(
            { _id: communityPostID },
            {
                $pull: { likes: userID },
                $inc: { likeCount: -1 },
            }
        );

        return res.status(200).json({
            status: 'success',
            message: 'Decremented like count',
            newLikeCount: post.likeCount - 1,
        })
    }
    catch (e) {
        return res.status(500).json({
            status: 'fail',
            message: e.message
        });
    }
})

router.get('/:communityID/:communityPostID/checkLiked', authMiddle, async (req, res) => {
    try {
        const { userID } = req.user;
        const { communityPostID } = req.params;

        if (!communityPostID)
            return res.status(404).json({
                status: 'fail',
                message: 'communityPostID not found',
            })

        if (!userID)
            return res.status(404).json({
                status: 'fail',
                message: 'userID not found',
            })

        const post = await CommunityPost.findById(communityPostID);

        if (!post)
            return res.status(404).json({
                status: 'fail',
                message: 'post not found',
            })


        if (post.likes.includes(userID))
            return res.status(200).json({
                status: 'success',
                liked: JSON.stringify(true),
            })
        else
            return res.status(400).json({
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


// comments

router.get('/:communityID/:communityPostID/comments', authMiddle, async (req, res) => {
    try {
        const { userID } = req.user;
        const { communityPostID } = req.params;

        if (!communityPostID)
            return res.status(404).json({
                status: 'fail',
                message: 'communityPostID not found',
            })

        const post = await CommunityPost.findById(communityPostID);

        if (!post)
            return res.status(404).json({
                status: 'fail',
                message: 'post not found',
            })

        return res.status(200).json({
            status: 'success',
            message: 'fetched all comments for post',
            comments: post.comments,
        })
    }
    catch (e) {
        return res.status(500).json({
            status: 'fail',
            message: e.message
        });
    }
})

router.post('/:communityID/:communityPostID/comments/newComment', authMiddle, async (req, res) => {
    try {
        const { userID, username, userType } = req.user;
        const { communityPostID } = req.params;
        const { newComment } = req.body;

        if (!communityPostID)
            return res.status(400).json({
                status: 'fail',
                message: 'communityPostID not found',
            })

        if (!newComment)
            return res.status(400).json({
                status: 'fail',
                message: 'no comment text entered',
            })

        const post = await CommunityPost.findById(communityPostID);

        if (!post)
            return res.status(404).json({
                status: 'fail',
                message: 'post not found',
            })

        const comment = {
            _id: new mongoose.mongo.ObjectId(),
            userID: userID,
            userType: userType,
            username: username,
            content: newComment,
        };

        post.comments.unshift(comment);
        await post.save();

        return res.status(200).json({
            status: 'success',
            message: 'Saved comment',
        })
    }
    catch (e) {
        return res.status(500).json({
            status: 'fail',
            message: e.message
        });
    }
})

router.delete('/:communityID/:communityPostID/comments/deleteComment/:commentID', authMiddle, async (req, res) => {
    try {
        const { userID, userType } = req.user;
        const { communityPostID, commentID } = req.params;

        if (!communityPostID || !commentID)
            return res.status(400).json({
                status: 'fail',
                message: 'Both communityPostID and commentID are required',
            });

        const post = await CommunityPost.findById(communityPostID);
        if (!post)
            return res.status(404).json({
                status: 'fail',
                message: 'CommunityPost not found',
            });

        const commentToBeDeleted = post.comments.find(
            (comment) => comment._id.toString() === commentID.toString()
        );

        if (!commentToBeDeleted)
            return res.status(404).json({
                status: 'fail',
                message: 'Comment not found',
            });

        if (commentToBeDeleted.userID.toString() !== userID.toString())
            return res.status(400).json({
                status: 'fail',
                message: 'You cannot delete others comments',
            });

        const UserModel = userType === 'Student' ? Student : Alumni;
        const user = await UserModel.findById(userID);
        if (!user)
            return res.status(404).json({
                status: 'fail',
                message: 'User not found.',
            });

        await CommunityPost.updateOne(
            { _id: communityPostID },
            { $pull: { comments: { _id: commentID } } }
        );

        await UserModel.updateOne(
            { _id: userID },
            { $pull: { comments: commentID } }
        );

        return res.status(200).json({
            status: 'success',
            message: 'Comment deleted successfully',
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