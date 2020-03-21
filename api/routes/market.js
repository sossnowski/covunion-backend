const express = require('express');
const auth = require('../services/auth')
const Task = require('../models/Task')
const taskValidation = require('../resources/taskValidation')
const router = express.Router();


router.post('/', taskValidation, auth, (req, res, next) => {
    const task = new Task({
        advertisement: req.body.advertisementId,
        owner: req.body.owner,
        executor: req.data.name,
        ownerTelephone: req.body.ownerTelephone,
        executorTelephone: req.body.executorTelephone
    })

    task.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Task created'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
})

router.get('/taskAsOwner', auth, (req, res, next) => {
    Task.find({owner: req.data.name})
        .populate('advertisement')
        .exec()
        .then(tasks => {
            res.status(200).json({
                tasks: tasks
            });
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: "An error has occured"
            })
        })
})

router.get('/taskAsExecutor', auth, (req, res, next) => {
    Task.find({executor: req.data.name})
        .populate('advertisement')
        .exec()
        .then(tasks => {
            res.status(200).json({
                tasks: tasks
            });
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: "An error has occured"
            })
        })
})

router.patch('/ownerDone/:taskId', auth, (req, res, next) => {
    Task.findOneAndUpdate({_id: req.params.taskId}, {
        ownerDecision: true,
    }, (err, idea) => {
        if (err) return res.status(500).json({error: err})

        if (idea == null) res.status(404).json({message: "There is no such task"})
        res.status(200).json({message: 'Task edited'})
    })
})

router.patch('/executorDone/:taskId', auth, (req, res, next) => {
    Task.findOneAndUpdate({_id: req.params.taskId}, {
        executorDecision: true,
    }, (err, idea) => {
        if (err) return res.status(500).json({error: err})

        if (idea == null) res.status(404).json({message: "There is no such task"})
        res.status(200).json({message: 'Task edited'})
    })
})

router.delete('/:id', auth, (req, res, next) => {
    Task.findOneAndDelete({_id: req.params.id}, (err, idea) => {
        if (err) return res.status(500).json({error: err})

        if (idea == null) res.status(404).json({message: "There is no such task"})
        res.status(200).json({message: 'Task deleted'})
    })
})

router.get('/allMyTasks', auth, (req, res, next) => {
    Task.find({ $or:[ {executor: req.data.name}, {owner: req.data.name}]})
        .populate('advertisement')
        .exec()
        .then(tasks => {
            res.status(200).json({
                tasks: tasks
            });
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: "An error has occured"
            })
        })
})


module.exports = router;

