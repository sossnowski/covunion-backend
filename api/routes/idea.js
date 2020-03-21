const express = require('express');
const mongoose = require('mongoose');
const auth = require('../services/auth')
const Idea = require('../models/Idea')
const Vote = require('../models/Vote')
const ideaValidation = require('../resources/ideaValidation')
const router = express.Router();

router.get('/allIdeas', (req, res, next) => {
    Idea.find({})
        .sort({votes: -1})
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



router.delete('/deleteIdea', auth, (req, res, next) => {
    Idea.findOneAndDelete({_id: req.body.id}, (err, idea) => {
        if (err) return res.status(500).json({error: err})

        if (idea == null) res.status(404).json({message: "There is no such idea"})
        res.status(200).json({message: 'Idea deleted'})
    })
})


router.patch('/vote', auth, (req, res, next) => {
    Vote.find({user: req.data.name})
        .exec()
        .then( votes => {
            let voted = votes.find(vote => {
                return vote.ideaId === req.body.ideaId
            })
            console.log(voted)
            if (voted != undefined) throw "You cannot double vote for an idea"


            const vote = new Vote({
                ideaId: req.body.ideaId,
                user: req.data.name,
            });

            Idea.updateOne(
                {_id: req.body.ideaId },
                {$inc: { votes: 1 }}
            ).exec()
            vote.save()
            return res.status(200).json({message: "successfully voted"})


        })
        .catch(error => {
            return res.status(500).json({message: error})
        })
})


module.exports = router;