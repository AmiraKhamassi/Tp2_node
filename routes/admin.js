const express = require('express');
const router = express.Router();

const User = require('../models/user')

router.get('/', async (req, res) => {
     res.json({ msg: 'GET /admin' })
 })
router.get('/:_id', async (req, res) => { res.json({ msg: 'GET /admin/:id' }) })
router.put('/:_id', async (req, res) => { res.json({ msg: 'PUT /admin/:id' }) })
router.delete('/:_id', async (req, res) => { res.json({ msg: 'DELETE /admin/:id' }) })

module.exports = router;
