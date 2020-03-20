const express = require('express');
const auth = require('../services/auth')
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "masz tutaj super templatke do api napisanego w expressie wraz z rejestracja i logowaniem uzytkownikow. Korzystaj madrze."
    });
});

router.get('/:id', auth, (req, res, next) => {
    const id = req.params.id;
    res.status(200).json({
        message: "info GET request z parametrem :D. Chronione autoryzacja",
        id: id
    });
});

module.exports = router;