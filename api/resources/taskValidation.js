module.exports = (req, res, next) => {
    try {
        if (!req.body.executorTelephone.length !== 9) throw 'Give correct telephone number'
        if (!req.body.ownerTelephone.length) throw 'There is lack of task owner telephone'
        if (!req.body.owner.length) throw 'There is lack of task owner'
        if (!req.body.advertisementId.length) throw 'There is lack of advertisement id'
        next()
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}