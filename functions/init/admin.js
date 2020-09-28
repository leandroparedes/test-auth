const admin = require('firebase-admin');

admin.initializeApp();

// Get a reference to the database service
const database = admin.database();

module.exports = { database };