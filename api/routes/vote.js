const express = require('express');
const auth = require('../services/auth')
const Vote = require('../models/Vote')
const router = express.Router();
const incrementVote = require('../services/idea/incrementVote')






router.patch('/vote', auth, (req, res, next) => {
    Vote.find({user: req.data.name})
        .exec()
        .then( votes => {
            let voted = votes.find(vote => {
                return vote.ideaId === req.body.ideaId
            })
            console.log(voted)
            if (voted != undefined) throw "You cannot double vote for an idea"

            incrementVote(req.body.ideaId)


            const vote = new Vote({
                ideaId: req.body.ideaId,
                user: req.data.name,
            });

            vote.save()
            return res.status(200).json({message: "successfully voted"})


        })
        .catch(error => {
            return res.status(500).json({message: error})
        })
})


module.exports = router;