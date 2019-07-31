const express = require('express')

const postRouter =require('./posts/postRouter')
const helmet = require('helmet')
const morgan = require('morgan')

const server = express()

server.use(morgan('dev'))
server.use(logger)
server.use(express.json())
server.use('/api/posts', postRouter)
server.use(helmet())

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} request received`)
  next()
}

module.exports = server
