const { app } = require('./init/express');
const { database } = require('./init/admin');

app.post('/messages', async (req, res) => {
    const message = req.body.message;
    const userUid = req.body.user_uid;

    return database.ref('/messages').push({
        message: message,
        user_uid: userUid
    }).then(() => res.end());
});

module.exports = { messagesApp: app };