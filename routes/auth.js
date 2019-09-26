const express = require('express');
const router = express.Router();

const User = require('../models/user')

router.post('/signin', async (req, res) => { res.json({ msg: 'POST /auth/signin' }) })

router.post('/signup', async (req, res) => {
    const { name, password } = req.body // bodyparser les a crée et mis dans propriete body 

    try {
        const userFound = await User.find({name})
        if (userFound) {
            throw { code: 400, msg: 'Veuillez choisir un autre nom'}
        }
    } catch (error) {
        console.log(err)
        const {code, msg} = err
        if (code === 400) {res.status(400).json({status, msg})}
        res.status(500).json({
            status: 500,
            msg: 'Erreur interne de serveur'
        })
    }

    try {
        const savedUser = await User.save(new User({name, password}))
    } catch (error) {
    }
    res.json({ msg: 'POST /auth/signup' }) 
})

module.exports = router;
