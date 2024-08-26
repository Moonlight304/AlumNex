const mongoose = require('mongoose');

// Author Model Schema (for dynamic referencing)
const userTypeSchema = {
    userType: {
        type: String,
        required: true,
        enum: ['Student', 'Alumni'],
    },
};

// Comment Schema
const commentSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'userType',
    },
    ...userTypeSchema,
    username: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

// Speaker Schema
const speakerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
});

// Event Schema
const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    venue: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    schedule: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        required: true,
        enum: ['social', 'career'],
    },
    speakers: [speakerSchema],
    sponsors: [String],
}, { timestamps: true });

// Feed FeedPost Schema
const feedPostSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'userType',
    },
    userType: {
        type: String,
        required: true,
        enum: ['Student', 'Alumni'],
    },
    username: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        required: true,
        enum: ['success story', 'achievement', 'article']
    },
    likeCount: {
        type: Number,
        default: 0,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'userType',
        }
    ],
    comments: [commentSchema]
}, { timestamps: true });

// Community FeedPost Schema
const communityPostSchema = new mongoose.Schema({
    communityID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community',
        required: true,
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'userType',
    },
    userType: {
        type: String,
        required: true,
        enum: ['Student', 'Alumni'],
    },
    username: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        required: true,
        enum: ['question', 'resources', 'roadmaps']
    },
    likeCount: {
        type: Number,
        default: 0,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'userType',
        }
    ],
    comments: [commentSchema]
}, { timestamps: true });

// Community Schema
const communitySchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'userType',
    },
    ...userTypeSchema,
    createdBy: {
        type: String,
        required: true,
    },
    name: {
        type : String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    members : [
        {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'userType',
        }
    ],
    memberCount : {
        type : Number,
        default: 0,
    }
}, { timestamps: true });

// Job Schema
const jobSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Alumni',
    },
    username: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        enum: ['full time', 'remote', 'internship', 'hybrid'],
        required: true,
    },
    requirements: [String],
}, { timestamps: true });

// Student Schema
const studentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        default: '',
        maxlength: 500,
    },
    gender: {
        type: String,
        default: 'don\'t specify',
        enum: ['Male', 'Female', 'don\'t specify'],
    },
    followersCount: {
        type: Number,
        default: 0,
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'userType',
        }
    ],
    followingCount: {
        type: Number,
        default: 0,
    },
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'userType',
        }
    ],
    feedPosts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'FeedPost',
        }
    ],
    communities : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Community',
        }
    ],
    communityPosts : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CommunityPost',
        }
    ],
    comments: [commentSchema]
});

// Alumni Schema
const alumniSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        default: '',
        maxlength: 500,
    },
    gender: {
        type: String,
        default: 'don\'t specify',
        enum: ['Male', 'Female', 'don\'t specify'],
    },
    gradYear: {
        type: String,
        required: true,
    },
    openToMentor : {
        type: Boolean,
        required: true,
    },
    mentorPitch : {
        type: String,
        default: '',
    },
    donation: {
        type: Number,
        default: 0,
    },
    verified: {
        type: Boolean,
        default: false,
        required: true,
    },
    followersCount: {
        type: Number,
        default: 0,
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'userType',
        }
    ],
    followingCount: {
        type: Number,
        default: 0,
    },
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'userType',
        }
    ],
    feedPosts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'FeedPost',
        }
    ],
    jobs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job',
        }
    ],
    communities : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Community',
        }
    ],
    communityPosts : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CommunityPost',
        }
    ],
    comments: [commentSchema]
});

// Models
const Student = mongoose.model('Student', studentSchema);
const Alumni = mongoose.model('Alumni', alumniSchema);
const FeedPost = mongoose.model('FeedPost', feedPostSchema);
const Event = mongoose.model('Event', eventSchema);
const Community = mongoose.model('Community', communitySchema);
const CommunityPost = mongoose.model('CommunityPost', communityPostSchema);
const Job = mongoose.model('Job', jobSchema);

module.exports = { Student, Alumni, FeedPost, Event, Community, CommunityPost, Job };
