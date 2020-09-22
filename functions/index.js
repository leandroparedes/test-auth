const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

// Get a reference to the database service
const database = admin.database();

// express setup
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: true }));

// express endpoints
app.post('/', async (req, res) => {
    const post = req.body.post;
    const userUid = req.body.user_uid;

    database.ref('/posts').push().set({
        post: post,
        user_uid: userUid
    }).then(() => res.end());
});

exports.posts = functions.https.onRequest(app);

