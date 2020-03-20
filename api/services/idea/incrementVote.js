const Idea = require('../../models/Idea')

module.exports = (ideaId) => {
    Idea.updateOne(
        {_id: ideaId }, {
            $inc: { votes: 1 }
        })
        .exec()
        .then(result => {
            if (result == null) throw "An error has occurred"
        })
}