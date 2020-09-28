const { app } = require('./init/express');
const { database } = require('./init/admin');

app.post('/posts', async (req, res) => {
    const post = req.body.post;
    const userUid = req.body.user_uid;

    return database.ref('/posts').push({
        post: post,
        user_uid: userUid
    }).then(() => res.end());
});

module.exports = { postsApp: app };