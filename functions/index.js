// Revisar:
// https://firebase.google.com/docs/functions/organize-functions

const functions = require('firebase-functions');

const { postsApp } = require('./posts');

exports.posts = functions.https.onRequest(postsApp);

