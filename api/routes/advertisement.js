const express = require('express');
const auth = require('../services/auth')
const Advertisement = require('../models/Advertisement')
const adValidation = require('../resources/adValidation')
const router = express.Router();


router.post('/', adValidation, auth, (req, res, next) => {
    const adObject = new Advertisement({
        title: req.body.title,
        description: req.body.description,
        user: req.data.name,
        localization: req.body.localization,
        date: new Date(),
        coordinates: req.body.coordinates,
        needHelp: req.body.needHelp
    })

    adObject.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Advertisement created'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

})

router.get('/all', auth, (req, res, next) => {
    Advertisement.find({})
        .exec()
        .then(ads => {
            res.status(200).json({
                ideas: ads
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "An error has occurred"
            })
        })
})

router.get('/:id', auth, (req, res, next) => {
    Advertisement.findOne({_id: req.params.id})
        .exec()
        .then(ad => {
            res.status(200).json({
                ideas: ad
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "An error has occurred"
            })
        })
})

router.patch('/', auth, (req, res, next) => {
    Advertisement.findOneAndUpdate({_id: req.body.id}, {
        title: req.body.title,
        description: req.body.description,
        localization: req.body.localization,
        coordinates: req.body.coordinates,
        needHelp: req.body.needHelp
    }, (err, idea) => {
        if (err) return res.status(500).json({error: err})

        if (idea == null) return res.status(404).json({message: "There is no such advertisement"})
        res.status(200).json({message: 'Advertisement edited'})
    })
})

router.delete('/', auth, (req, res, next) => {
    Advertisement.findOneAndDelete({_id: req.body.id}, (err, idea) => {
        if (err) return res.status(500).json({error: err})

        if (idea == null) res.status(404).json({message: "There is no such advertisement"})
        res.status(200).json({message: 'Advertisement deleted'})
    })
})


module.exports = router;