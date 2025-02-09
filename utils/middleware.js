const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:', request.path)
  logger.info('Body:', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ message: 'Unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error('Error handler:', error.message)

  if (error.name === 'ValidationError') {
    return response.status(400).json({ message: error.message })
  } 
  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
}