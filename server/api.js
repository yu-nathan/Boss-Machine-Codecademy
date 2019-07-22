const express = require('express');
const apiRouter = express.Router();
const db = require('./db.js');

apiRouter.get('/minions', (req, res, next) => {
    res.send(db.getAllFromDatabase('minions'))
});

apiRouter.post('/minions', (req, res, next) => {
    const newMinion = db.addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

api

module.exports = apiRouter;
