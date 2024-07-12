const express = require('express')
const app = express()
const config = require('./utils/config')
const cors = require('cors')
const mailRouter = require('./controllers/sendMail')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const morgan = require('morgan')

app
  .use(cors())
  .use(express.static('dist'))
  .use(express.json())
  .use(morgan('dev'))
  .use(middleware.requestLogger)
  .use('/vhos/mail', mailRouter)
  .use(middleware.unknownEndpoint)
  .use(middleware.errorHandler)

  module.exports = app