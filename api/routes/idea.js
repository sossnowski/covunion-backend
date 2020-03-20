const express = require('express');
const mongoose = require('mongoose');
const auth = require('../services/auth')
const Idea = require('../models/Idea')
const ideaValidation = require('../resources/ideaValidation')
const router = express.Router();

router.get('/allIdeas', (req, res, next) => {
    Idea.find({})
        .exec()
        .then(ideas => {
            res.status(200).json({
                ideas: ideas
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "An error has occured"
            })
        })
});

router.post('/addIdea', ideaValidation, auth, (req, res, next) => {
    const idea = new Idea({
        title: req.body.title,
        description: req.body.description,
        author: req.data.name,
        votes: 0
    });

    idea.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'idea created'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
})

router.patch('/editIdea', ideaValidation, auth, (req, res, next) => {
    Idea.findOneAndUpdate({_id: req.body.id}, {
        title: req.body.title,
        description: req.body.description
    }, (err, idea) => {
        if (err) return res.status(500).json({error: err})

        if (idea == null) res.status(404).json({message: "There is no such idea"})
        res.status(200).json({message: 'Idea edited'})
    })
})


module.exports = router;