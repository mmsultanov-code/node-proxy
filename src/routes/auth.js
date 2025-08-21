const express = require('express')
const auth_routes = express.Router()

auth_routes.post('/staff/token', async (request, response) => {
    try {
        const res = await fetch(process.env.BASE_URL + '/auth-app/staff/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request.body)
        })
        const data = await res.json()
        response.json(data)
    } catch (err) {
        console.log(err)
    }
})
auth_routes.post('/staff/refresh-token', async (request, response) => {
    try {
        const res = await fetch(process.env.BASE_URL + '/auth-app/staff/refresh-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request.body)
        })
        const data = await res.json()
        response.json(data)
    } catch (err) {
        console.log(err)
    }
})

module.exports = auth_routes