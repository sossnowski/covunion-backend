const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto')
var nodemailer = require("nodemailer")
const generateToken = require('../services/generateToken')
const userValidation = require('../resources/userValidation')
require('dotenv').config();
const router = express.Router();
const saltRounds = 10;

const User = require('../models/User');

router.post('/signup', userValidation, (req, res, next) => {
    User.find({name: req.body.username})
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'name exists'
                });
            } else {
                bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            id: new mongoose.Types.ObjectId,
                            name: req.body.username,
                            password: hash,
                            email: req.body.email
                        });

                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'user created'
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        });
});

router.post('/login', (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth failed"
                })
            } else {
                bcrypt.compare(req.body.password, user[0].password, function (err, result) {
                    if (err) {
                        return res.status(401).json({
                            message: 'Auth failed'
                        });
                    }
                    if (result) {
                        const objectData = {
                            name: user[0].email
                        }
                        let token = generateToken(objectData)
                        return res.status(200).json({
                            message: 'Auth succeed',
                            token: token,
                        });
                    }
                    res.status(401).json({
                        message: 'Auth failed'
                    });
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/forgot', async (req, res, next) => {
    const token = crypto.randomBytes(20).toString('hex');
    bcrypt.hash(token, saltRounds, function (err, hash) {
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else {
            User.findOneAndUpdate({name: req.body.name}, {password: hash}, (err, user) => {
                if (err) return res.status(500).json({error: err})

                if (user == null) {
                    res.status(404).json({message: "there is no user assigned to this username"})
                } else {
                    let smtpTransport = nodemailer.createTransport({
                        service: 'Gmail',
                        auth: {
                            user: process.env.MAIL_FROM,
                            pass: process.env.MAIL_PW
                        }
                    });
                    var mailOptions = {
                        to: user.name,
                        from: process.env.MAIL_FROM,
                        subject: 'Node.js Password Reset',
                        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                            'Your new password: ' + token + '\n' +
                            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                    };
                    smtpTransport.sendMail(mailOptions, function (err) {
                        if (err) return res.status(500).json({error: err})
                        console.log('mail sent');
                        req.status(200).json({message: 'email was sent'})
                    });
                }
            })
        }
    })
});

module.exports = router;