const express = require('express')
const services_routes = express.Router()

services_routes.get('/service/groups', async (request, response) => {
    try {
        const res = await fetch(process.env.BASE_URL + request.originalUrl, {
            method: 'GET',
            query: request.query,
            headers: {...request.headers, 'x-realm': 'apex'}
        })
        const data = await res.json()
        response.send(data.data)
    } catch (err) {
        response.status(401).json({
            message: 'Ваши авторизационные данные были очищены.',
            status: 500
        })
    }
})
services_routes.get('/service/fee', async (request, response) => {
    try {
        const res = await fetch(process.env.BASE_URL + request.originalUrl, {
            method: 'GET',
            query: request.query,
            headers: {...request.headers, 'x-realm': 'apex'}
        })
        const data = await res.json()
        response.send(data.data)
    } catch (err) {
        response.status(401).json({
            message: 'Ваши авторизационные данные были очищены.',
            status: 500
        })
    }
})

module.exports = services_routes