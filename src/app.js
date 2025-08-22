const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const auth_routes = require('./routes/auth')
const black_list_routes = require('./routes/black-list')
const services_routes = require('./routes/services')
const app = express()
require('dotenv').config({ debug: false })
const port = +process.env.PORT

app.use(express.json())
app.use(bodyParser.json())
app.use(cors())

app.use('/auth-app', auth_routes)
app.use('/admin-gateway-app', black_list_routes)
app.use('/service-gateway-app', services_routes)

app.listen(port, () => {
    console.log('проект запущен на ' + port + ' порту')
})