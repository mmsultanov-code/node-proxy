const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = 3002
const TARGET_URL = process.env.BASE_URL

app.use(
    cors({
        origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization']
    })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.originalUrl}`)
    console.log('Request headers:', req.headers)
    next()
})

app.use(
    '/',
    createProxyMiddleware({
        target: TARGET_URL,
        changeOrigin: true,
        secure: false,
        onProxyReq: (proxyReq, req, res) => {
            if (req.body && Object.keys(req.body).length) {
                const bodyData = JSON.stringify(req.body)
                proxyReq.setHeader('Accept', 'application/json')
                proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))
                proxyReq.setHeader('Authorization', req.headers.authorization)
                proxyReq.setHeader('Cookie', 'language=ru')
                proxyReq.setHeader('Cache-Control', 'no-cache')
            }
            // Удаляем куки из запроса
            proxyReq.removeHeader('cookie')
        },
        onProxyRes: (proxyRes, req, res) => {
            console.log(`Response from target: ${proxyRes.statusCode}`)
            console.log('Response headers:', proxyRes.headers)
            delete proxyRes.headers['set-cookie']
            res.header('Access-Control-Allow-Origin', req.headers.origin || '*')
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS')
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
            res.header('Access-Control-Allow-Credentials', 'true')
        }
    })
)

app.listen(PORT, () => {
    console.log(`Proxy server running at http://localhost:${PORT}`)
})
