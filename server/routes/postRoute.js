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
const { Student, Alumni, Post } = require('../models/db.js');

router.get('/', authMiddle, async (req, res) => {
    try {
        const filters = req.query.filters ? req.query.filters.split(',') : [];

        const filterQuery = {};
        if (filters.length) {
            filterQuery = { tag: { $in: filters } };
        }

        const allPosts = await Post.find(filterQuery).sort({ createdAt: -1 });

        return res.json({
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

router.get('/:postID', authMiddle, async (req, res) => {
    try {
        const { postID } = req.params;

        if (!postID)
            return res.json({
                status: 'fail',
                message: 'postID is required',
            })

        const post = await Post.findById(postID);

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
        return res.status(500).json({
            status: 'fail',
            message: e.message
        });
    }
})

router.post('/newPost', authMiddle, async (req, res) => {
    try {
        const { userID, username, userType} = req.user;
        const { content, tag } = req.body;

        console.log(req.body);

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

        const newPost = new Post({ userID, userType, username, content, tag });
        const savedPost = await newPost.save();

        const user = await (userType === 'Student' ? Student : Alumni).findById(userID);

        if (!user) {
            return res.json({
                status: 'fail',
                message: 'User not found.',
            });
        }

        user.posts.push(savedPost._id);
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

router.post('/editPost/:postID', authMiddle, async (req, res) => {
    try {
        const { userID, userType} = req.user;
        const { postID } = req.params;
        const { newContent, newTag } = req.body;
            
        if (!postID)
            return res.json({
                status: 'fail',
                message: 'postID is required',
            })

        if (!newContent || !newTag) {
            return res.json({
                status: 'fail',
                message: 'Incomplete atrributes',
            })
        }

        const post = await Post.findById(postID);

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

            
        post.content = newContent;
        post.tag = newTag;

        await post.save();

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

router.delete('/deletePost/:postID', authMiddle, async (req, res) => {
    try {
        const { userID, userType} = req.user;
        const { postID } = req.params;

        if (!postID)
            return res.json({
                status: 'fail',
                message: 'postID is required',
            })

        const post = await Post.findById(postID);

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

        await Post.deleteOne({ _id: postID });

        const UserModel = userType === 'Student' ? Student : Alumni;

        await UserModel.updateOne(
            { _id: userID },
            { $pull: { posts: postID } }
        );

        return res.json({
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

router.get('/like/:postID', authMiddle, async (req, res) => {
    try {
        const { userID } = req.user;
        const { postID } = req.params;

        if (!postID)
            return res.json({
                status: 'fail',
                message: 'postID is required',
            });

        const post = await Post.findById(postID);

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
        await Post.updateOne(
            { _id: postID },
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
        return res.status(500).json({
            status: 'fail',
            message: e.message
        });
    }
})

router.get('/dislike/:postID', authMiddle, async (req, res) => {
    try {
        const { userID } = req.user;
        const { postID } = req.params;

        if (!postID)
            return res.json({
                status: 'fail',
                message: 'postID is required',
            })

        const post = await Post.findById(postID);

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
        await Post.updateOne(
            { _id: postID },
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
        return res.status(500).json({
            status: 'fail',
            message: e.message
        });
    }
})

router.get('/:postID/checkLiked', authMiddle, async (req, res) => {
    try {
        const { userID } = req.user;
        const { postID } = req.params;

        if (!postID)
            return res.json({
                status: 'fail',
                message: 'postID not found',
            })

        if (!userID)
            return res.json({
                status: 'fail',
                message: 'userID not found',
            })

        const post = await Post.findById(postID);

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
        return res.status(500).json({
            status: 'fail',
            message: e.message
        });
    }
})

router.get('/:postID/comments', authMiddle, async (req, res) => {
    try {
        const { userID } = req.user;
        const { postID } = req.params;

        if (!postID)
            return res.json({
                status: 'fail',
                message: 'postID is required',
            })

        const post = await Post.findById(postID);

        if (!post)
            return res.json({
                status: 'fail',
                message: 'post not found',
            })

        return res.json({
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

router.post('/:postID/newComment', authMiddle, async (req, res) => {
    try {
        const { userID, username, userType } = req.user;
        const { postID } = req.params;
        const { newComment } = req.body;

        if (!postID)
            return res.json({
                status: 'fail',
                message: 'postID is required',
            })

        if (!newComment)
            return res.json({
                status: 'fail',
                message: 'no comment text entered',
            })

        const post = await Post.findById(postID);

        if (!post)
            return res.json({
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

        return res.json({
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

router.get('/:postID/deleteComment/:commentID', authMiddle, async (req, res) => {
    try {
        const { userID } = req.user;
        const { postID, commentID } = req.params;

        if (!postID || !commentID)
            return res.json({
                status: 'fail',
                message: 'Both postID and commentID are required',
            });

        const post = await Post.findById(postID);
        if (!post)
            return res.json({
                status: 'fail',
                message: 'Post not found',
            });

        const commentToBeDeleted = post.comments.find(
            (comment) => comment._id.toString() === commentID.toString()
        );

        if (!commentToBeDeleted)
            return res.json({
                status: 'fail',
                message: 'Comment not found',
            });

        if (commentToBeDeleted.author.toString() !== userID.toString())
            return res.json({
                status: 'fail',
                message: 'You cannot delete others comments',
            });

        const deletePostUpdateResult = await Post.updateOne(
            { _id: postID },
            { $pull: { comments: { _id: commentID } } }
        );
        if (deletePostUpdateResult.modifiedCount === 0) {
            return res.json({
                status: 'fail',
                message: 'Failed to delete comment from post',
            });
        }

        return res.json({
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