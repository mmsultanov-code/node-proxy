const express = require('express')
const black_list_routes = express.Router()

black_list_routes.get('/blacklist', async (request, response) => {
    try {
        const res = await fetch(process.env.BASE_URL + request.originalUrl, {
            method: 'GET',
            query: request.query,
            headers: {...request.headers, 'x-realm': 'apex'}
        })
        const data = await res.json()
        response.send(data.data.data)
    } catch (err) {
        response.status(401).json({
            message: 'Ваши авторизационные данные были очищены.',
            status: 500
        })
    }
})

black_list_routes.get('/blacklist/property', async (request, response) => {
    try {
        const res = await fetch(process.env.BASE_URL + request.originalUrl, {
            method: 'GET',
            headers: {...request.headers, 'x-realm': 'apex'}
        })
        const data = await res.json()
        response.send(data.data.data)
    } catch (err) {
        response.status(401).json({
            message: 'Ваши авторизационные данные были очищены.',
            status: 500
        })
    }
})

module.exports = black_list_routes