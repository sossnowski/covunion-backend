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
        address: req.body.address,
        date: new Date(),
        coordinates: req.body.coordinates,
        needHelp: req.body.needHelp,
        userTelephone: req.body.userTelephone
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

router.get('/all', (req, res, next) => {
    Advertisement.find({active: true})
        .exec()
        .then(ads => {
            res.status(200).json({
                ads: ads
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
                ad: ad
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "An error has occurred"
            })
        })
})

router.get('/my/:id*?', auth, (req, res, next) => {
    Advertisement.find({user: req.data.name})
        .exec()
        .then(ad => {
            res.status(200).json({
                ads: ad
            });
        })
        .catch(error => {
            res.status(500).json({
                message: error
            })
        })
})

router.patch('/',adValidation, auth, (req, res, next) => {
    Advertisement.findOneAndUpdate({_id: req.body.id}, {
        title: req.body.title,
        description: req.body.description,
        localization: req.body.localization,
        address: req.body.address,
        coordinates: req.body.coordinates,
        needHelp: req.body.needHelp,
        userTelephone: req.body.userTelephone
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

router.patch('/checkInActive/:id', auth, (req, res, next) => {
    Advertisement.findOneAndUpdate({_id: req.params.id}, {
        active: false
    }, (err, idea) => {
        if (err) return res.status(500).json({error: err})

        if (idea == null) return res.status(404).json({message: "There is no such advertisement"})
        res.status(200).json({message: 'Advertisement edited'})
    })
})

router.patch('/checkActive/:id', auth, (req, res, next) => {
    Advertisement.findOneAndUpdate({_id: req.params.id}, {
        active: true
    }, (err, idea) => {
        if (err) return res.status(500).json({error: err})

        if (idea == null) return res.status(404).json({message: "There is no such advertisement"})
        res.status(200).json({message: 'Advertisement edited'})
    })
})


module.exports = router;