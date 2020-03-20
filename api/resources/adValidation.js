module.exports = (req, res, next) => {
    try {
        if (!req.body.title.length) throw 'Title of the idea is required'
        if (!req.body.description) throw 'Description of the idea is required'
        if (!req.body.localization) throw 'Localization of the idea is required'
        if (req.body.needHelp == undefined) throw 'Check if you need help'
        if (req.body.coordinates === undefined) req.body.coordinates = 'none'
        if (req.body.userTelephone.length !== 9) throw 'Give correct phonr number'
        next()
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}