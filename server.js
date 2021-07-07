const express = require('express')

const postRouter =require('./posts/postRouter')
const userRouter =require('./users/userRouter')
const helmet = require('helmet')
const morgan = require('morgan')

const messageOfTheDay = process.env.MOTD || 'Hello, World!'

const server = express()

server.use(morgan('dev'))
server.use(logger)
server.use(express.json())
server.use('/api/posts', postRouter)
server.use('/api/users', userRouter)
server.use(helmet())

server.get("/", (req, res) => {
  res.send(`<h2>${messageOfTheDay}</h2>`)
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} request received`)
  next()
}

module.exports = server
