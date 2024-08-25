const express = require('express');
const app = express()
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

const PORT = 3000

const { Student, Alumni, Post, Event, Community, Job } = require('./models/db.js');

mongoose.connect(process.env.dbURL)
    .then(() => {
        console.log('DB connected');
    })
    .catch((e) => {
        console.log('DB Error ' + e);
    })


app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(cors({ origin: process.env.frontendURL, credentials: true }));

const authRoute = require('./routes/authRoute.js');
const postRoute = require('./routes/postRoute.js');
const jobRoute = require('./routes/jobRoute.js');
const dontationRoute = require('./routes/donationRoute.js');
const eventsRoute = require('./routes/eventsRoute.js');
const communityRoute = require('./routes/communityRoute.js');

app.use('/auth', authRoute);
app.use('/posts', postRoute);
app.use('/jobs', jobRoute);
app.use('/donations', dontationRoute);
app.use('/events', eventsRoute);
app.use('/community', communityRoute);

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}...`);
})