const express = require('express')
const api = express()
const helmet = require('helmet')
const bodyParser = require('body-parser')

const { server: { port }, dbUrl } = require('./config')
const { catchJsonError, setResponseHeaders } = require('./middlewares')

const admin = require('./routes/admin')
const auth = require('./routes/auth')
const deadEnd = require('./routes/dead-end')

const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
mongoose.connect(dbUrl, {
    useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'ERROR: CANNOT CONNECT TO MONGO-DB'))
db.once('open', () => {
    console.log('SUCCESS: CONNECTED TO MONGO-DB')
})

api.use(helmet())
api.use(setResponseHeaders)
api.use(bodyParser.json())
api.use(catchJsonError)

api.use('/admin', admin)
api.use('/auth', auth)
api.use('*', deadEnd)

api.listen(port.api, () => console.log(`Serveur lancé sur le port ${port.api}`))