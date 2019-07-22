const express = require('express');
const meetingRouter = express.Router();
const db = require('./db.js');

module.exports = meetingRouter;

meetingRouter.get('/', (req, res, next) => {
    res.send(db.getAllFromDatabase('meetings'))
});

meetingRouter.post('/', (req, res, next) => {
    const newMeeting = db.addToDatabase('meetings', db.createMeeting());
    res.status(201).send(newMeeting);
});

meetingRouter.delete('/', (req, res, next) => {
    const deletemeeting = db.deleteAllFromDatabase('meetings');
    res.status(204).send();
});
