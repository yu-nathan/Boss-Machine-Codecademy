const express = require('express');
const apiRouter = express.Router();
const db = require('./db.js');
const minionRouter = require('./minionRouter.js');
const ideaRouter = require('./ideaRouter.js');
const meetingRouter = require('./meetingRouter.js');

module.exports = apiRouter;

apiRouter.use('/minions', minionRouter);
apiRouter.use('/ideas', ideaRouter);
apiRouter.use('/meetings', meetingRouter);
