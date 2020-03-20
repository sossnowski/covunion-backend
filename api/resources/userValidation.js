module.exports = (req, res, next) => {
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    try {
        if (req.body.username.length < 5) throw 'username is not valid'
        if (!emailRegex.test(String(req.body.email).toLowerCase())) throw 'email is not valid'
        if (req.body.password.length < 5) throw 'password is not valid'
        next()
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}