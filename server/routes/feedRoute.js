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

// get all posts in feed
router.get('/', authMiddle, async (req, res) => {
    try {
        const filters = req.query.filters ? req.query.filters.split(',') : [];

        let filterQuery = {};
        if (filters.length) {
            filterQuery = { tag: { $in: filters }};
        }

        const allPosts = await FeedPost.find(filterQuery).sort({ createdAt: -1 });

        return res.json({
            status: 'success',
            count: allPosts.length,
            data: allPosts,
        });
    } 
    catch (e) {
        return res.json({
            status: 'fail',
            message: e.message
        });
    }
});


// CRUD

router.get('/:feedPostID', authMiddle, async (req, res) => {
    try {
        const { feedPostID } = req.params;

        if (!feedPostID)
            return res.json({
                status: 'fail',
                message: 'feedPostID is required',
            })

        const post = await FeedPost.findById(feedPostID);

        if (!post)
            return res.json({
                status: 'fail',
                message: 'post not found',
            })

        return res.json({
            status: 'success',
            post: post,
        })
    }
    catch (e) {
        return res.json({
            status: 'fail',
            message: e.message
        });
    }
})

router.post('/newPost', authMiddle, async (req, res) => {
    try {
        const { userID, username, userType} = req.user;
        const { content, tag } = req.body;

        if (!userID || !userType || !username || !content || !tag)
            return res.json({
                status: 'fail',
                message: 'Please specify all fields.',
            });

        if (!['Student', 'Alumni'].includes(userType)) {
            return res.json({
                status: 'fail',
                message: 'Invalid userType specified.',
            });
        }

        const newPost = new FeedPost({ userID, userType, username, content, tag });
        const savedPost = await newPost.save();

        const user = await (userType === 'Student' ? Student : Alumni).findById(userID);

        if (!user)
            return res.json({
                status: 'fail',
                message: 'User not found.',
            });

        user.feedPosts.unshift(savedPost._id);
        await user.save();

        return res.json({
            status: 'success',
            message: 'Posted successfully',
        });
    } 
    catch (e) {
        return res.json({
            status: 'fail',
            message: e.message
        });
    }
});

router.post('/editPost/:feedPostID', authMiddle, async (req, res) => {
    try {
        const { userID, userType} = req.user;
        const { feedPostID } = req.params;
        const { content, tag } = req.body;
        
        if (!feedPostID)
            return res.json({
                status: 'fail',
                message: 'feedPostID is required',
            })

        if (!content || !tag) {
            return res.json({
                status: 'fail',
                message: 'Incomplete atrributes',
            })
        }

        const post = await FeedPost.findById(feedPostID);

        if (!post)
            return res.json({
                status: 'fail',
                message: 'post not found',
            })

        if (userID !== post.userID._id.toString())
            return res.json({
                status: 'fail',
                message: 'cannot edit others posts',
            });

            
        post.content = content;
        post.tag = tag;

        await post.save();

        return res.json({
            status: 'success',
            message: 'Edited Post',
        });
    }
    catch (e) {
        return res.json({
            status: 'fail',
            message: e.message
        });
    }
})

router.delete('/deletePost/:feedPostID', authMiddle, async (req, res) => {
    try {
        const { userID, userType } = req.user;
        const { feedPostID } = req.params;

        if (!feedPostID)
            return res.json({
                status: 'fail',
                message: 'feedPostID is required',
            })

        const post = await FeedPost.findById(feedPostID);

        if (!post)
            return res.json({
                status: 'fail',
                message: 'post not found',
            })

        if (userID !== post.userID._id.toString())
            return res.json({
                status: 'fail',
                message: 'cannot delete others posts',
            })

        await FeedPost.deleteOne({ _id: feedPostID });

        const UserModel = userType === 'Student' ? Student : Alumni;

        await UserModel.updateOne(
            { _id: userID },
            { $pull: { feedPosts: feedPostID } }
        );

        return res.json({
            status: 'success',
            message: 'deleted post successfully',
        })
    }
    catch (e) {
        return res.json({
            status: 'fail',
            message: e.message
        });
    }
})


// like and dislike

router.get('/like/:feedPostID', authMiddle, async (req, res) => {
    try {
        const { userID } = req.user;
        const { feedPostID } = req.params;

        if (!feedPostID)
            return res.json({
                status: 'fail',
                message: 'feedPostID is required',
            });

        const post = await FeedPost.findById(feedPostID);

        if (!post)
            return res.json({
                status: 'fail',
                message: 'post not found',
            })

        if (post.likes.includes(userID))
            return res.json({
                status: 'fail',
                message: 'Already liked',
            })

        //update likecount and like array in post
        await FeedPost.updateOne(
            { _id: feedPostID },
            {
                $push: { likes: userID },
                $inc: { likeCount: 1 },
            }
        );

        return res.json({
            status: 'success',
            message: 'Incremented like count',
            newLikeCount: post.likeCount + 1,
        })
    }
    catch (e) {
        return res.json({
            status: 'fail',
            message: e.message
        });
    }
})

router.get('/dislike/:feedPostID', authMiddle, async (req, res) => {
    try {
        const { userID } = req.user;
        const { feedPostID } = req.params;

        if (!feedPostID)
            return res.json({
                status: 'fail',
                message: 'feedPostID is required',
            })

        const post = await FeedPost.findById(feedPostID);

        if (!post)
            return res.json({
                status: 'fail',
                message: 'post not found',
            })

        if (!post.likes.includes(userID))
            return res.json({
                status: 'fail',
                message: 'You did not like the post',
            })

        //update likecount and like array in post
        await FeedPost.updateOne(
            { _id: feedPostID },
            {
                $pull: { likes: userID },
                $inc: { likeCount: -1 },
            }
        );

        return res.json({
            status: 'success',
            message: 'Decremented like count',
            newLikeCount: post.likeCount - 1,
        })
    }
    catch (e) {
        return res.json({
            status: 'fail',
            message: e.message
        });
    }
})

router.get('/checkLiked/:feedPostID', authMiddle, async (req, res) => {
    try {
        const { userID } = req.user;
        const { feedPostID } = req.params;

        if (!feedPostID)
            return res.json({
                status: 'fail',
                message: 'feedPostID not found',
            })

        if (!userID)
            return res.json({
                status: 'fail',
                message: 'userID not found',
            })

        const post = await FeedPost.findById(feedPostID);

        if (!post)
            return res.json({
                status: 'fail',
                message: 'post not found',
            })


        if (post.likes.includes(userID))
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
        return res.json({
            status: 'fail',
            message: e.message
        });
    }
})


// comments

router.get('/:feedPostID/comments', authMiddle, async (req, res) => {
    try {
        const { userID } = req.user;
        const { feedPostID } = req.params;

        if (!feedPostID)
            return res.json({
                status: 'fail',
                message: 'feedPostID is required',
            })

        const post = await FeedPost.findById(feedPostID);

        if (!post)
            return res.json({
                status: 'fail',
                message: 'post not found',
            })

        return res.json({
            status: 'success',
            message: 'fetched all comments for post',
            comments: post.comments.sort({ createdAt: -1 }),
        })
    }
    catch (e) {
        return res.json({
            status: 'fail',
            message: e.message
        });
    }
})

router.post('/:feedPostID/comments/newComment', authMiddle, async (req, res) => {
    try {
        const { userID, username, userType } = req.user;
        const { feedPostID } = req.params;
        const { comment } = req.body;

        if (!feedPostID)
            return res.json({
                status: 'fail',
                message: 'feedPostID is required',
            })

        if (!comment)
            return res.json({
                status: 'fail',
                message: 'no comment text entered',
            })

        const post = await FeedPost.findById(feedPostID);

        if (!post)
            return res.json({
                status: 'fail',
                message: 'post not found',
            })

        const newCommentObj = {
            _id: new mongoose.mongo.ObjectId(),
            userID: userID,
            userType: userType,
            username: username,
            content: comment,
        };
        
        const user = await (userType === 'Student' ? Student : Alumni).findById(userID);
        if (!user)
            return res.json({
                status: 'fail',
                message: 'User not found.',
            });

        post.comments.unshift(newCommentObj);
        await post.save();

        user.comments.unshift(newCommentObj);
        await user.save();

        return res.json({
            status: 'success',
            message: 'Saved comment',
            newComment: newCommentObj
        })
    }
    catch (e) {
        return res.json({
            status: 'fail',
            message: e.message
        });
    }
})

router.delete('/:feedPostID/comments/deleteComment/:commentID', authMiddle, async (req, res) => {
    try {
        const { userID, userType } = req.user;
        const { feedPostID, commentID } = req.params;

        if (!feedPostID || !commentID)
            return res.json({
                status: 'fail',
                message: 'Both feedPostID and commentID are required',
            });

        const post = await FeedPost.findById(feedPostID);
        if (!post)
            return res.json({
                status: 'fail',
                message: 'FeedPost not found',
            });

        const commentToBeDeleted = post.comments.find(
            (comment) => comment._id.toString() === commentID.toString()
        );

        if (!commentToBeDeleted)
            return res.json({
                status: 'fail',
                message: 'Comment not found',
            });

        if (commentToBeDeleted.userID.toString() !== userID.toString())
            return res.json({
                status: 'fail',
                message: 'You cannot delete others comments',
            });

        const UserModel = userType === 'Student' ? Student : Alumni;
        const user = await UserModel.findById(userID);
        if (!user)
            return res.json({
                status: 'fail',
                message: 'User not found.',
            });

        await FeedPost.updateOne(
            { _id: feedPostID },
            { $pull: { comments: { _id: commentID } } }
        );

        await UserModel.updateOne(
            { _id: userID },
            { $pull: { comments: commentID } }
        );

        return res.json({
            status: 'success',
            message: 'Comment deleted successfully',
        });
    } catch (e) {
        return res.json({
            status: 'fail',
            message: e.message,
        });
    }
});


module.exports = router;