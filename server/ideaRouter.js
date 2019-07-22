const express = require('express');
const ideaRouter = express.Router();
const db = require('./db.js');
const checkMillionDollarIdea = require('./checkMillionDollarIdea.js');

module.exports = ideaRouter;

ideaRouter.param('ideaId', (req, res, next, id) => {
    const idea = db.getFromDatabaseById('ideas', id);
    if (idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send('Idea not found!');
    }
});

ideaRouter.get('/', (req, res, next) => {
    res.send(db.getAllFromDatabase('ideas'))
});

ideaRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = db.addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

ideaRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
});

ideaRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
    const updateIdea = db.updateInstanceInDatabase('ideas', req.body);
    res.send(updateIdea);
});

ideaRouter.delete('/:ideaId', (req, res, next) => {
    const deleteIdea = db.deleteFromDatabasebyId('ideas', req.idea.id);
    res.status(204).send();
});
