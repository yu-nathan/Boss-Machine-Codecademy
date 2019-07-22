const express = require('express');
const minionRouter = express.Router();
const db = require('./db.js');

module.exports = minionRouter;

minionRouter.param('minionId', (req, res, next, id) => {
    const minion = db.getFromDatabaseById('minions', id);
    if (minion) {
        req.minion = minion;
        next();
    } else {
        res.status(404).send('Minion not found!');
    }
});

minionRouter.get('/', (req, res, next) => {
    res.send(db.getAllFromDatabase('minions'))
});

minionRouter.post('/', (req, res, next) => {
    const newMinion = db.addToDatabase('minions', req.body);
    if (newMinion) {
        res.status(201).send(newMinion);
    } else {
        res.status(500).send();
    }
});

minionRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
});

minionRouter.put('/:minionId', (req, res, next) => {
    const updateMinion = db.updateInstanceInDatabase('minions', req.body);
    res.send(updateMinion);
});

minionRouter.delete('/:minionId', (req, res, next) => {
    const deleteMinion = db.deleteFromDatabasebyId('minions', req.minion.id);
    res.status(204).send();
});

minionRouter.get('/:minionId/work', (req, res, next) => {
    const work = db.getAllFromDatabase('work').filter(minionWork => {
        return minionWork.id == req.minion.id;
    });
    res.send(work);
});

minionRouter.post('/:minionId/work', (req, res, next) => {
    const newWork = db.addToDatabase('work', req.body);
    if (newWork) {
        res.status(201).send(newWork);
    } else {
        res.status(500).send();
    }
});

minionRouter.param('workId', (req, res, next, id) => {
    const work = db.getFromDatabaseById('work', id);
    if (work) {
        req.work = work;
        next();
    } else {
        res.status(404).send('Work not found!');
    }
});

minionRouter.put('/:minionId/work/:workId', (req, res, next) => {
    if (req.minion.id != req.work.minionId) {
        return res.status(400).send();
    }
    const updateWork = db.updateInstanceInDatabase('work', req.body);
    res.send(updateWork);
});

minionRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    const deleteWork = db.deleteFromDatabasebyId('work', req.work.id);
    res.status(204).send();
})
