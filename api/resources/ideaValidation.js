module.exports = (req, res, next) => {
    try {
        if (!req.body.title.length) throw 'Title of the idea is required'
        if (!req.body.description.length) req.body.description = req.body.title
        next()
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}