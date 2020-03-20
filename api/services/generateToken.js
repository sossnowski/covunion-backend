const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (dataObject) =>
{
    return jwt.sign(dataObject, process.env.JWT_KEY, {expiresIn: process.env.TOKEN_EXPIRED})
}
