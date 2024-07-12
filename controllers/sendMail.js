const mailRouter = require('express').Router()
const nodemailer = require('nodemailer')
const logger = require('../utils/logger')

mailRouter.post('/', async (req, res, next) => {
  const { body } = req
  try {
    const transporter = nodemailer.createTransport({
      host: 'mail.vhos.cl',
      port: 465,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: 'contacto@vhos.cl',
        pass: process.env.PASSWORD,
      },
    })

    try {
      await transporter.verify()
      logger.info('Ready to send emails')
    } catch (error) {
      logger.error('Error verifying transporter', error)
      return res.status(500).json({ error: 'Error verifying transporter' })
    }

    try {
      const info = await transporter.sendMail({
        from: `"Página web - Vhos Ingeniería. De ${body.name}" <contacto@vhos.cl>`, // Dirección del remitente
        to: 'contacto@vhos.cl', // [] Lista de destinatarios
        subject: 'Página web - Vhos Ingeniería', // Línea de asunto
        //text: `Nombre: ${body.name} - Email: ${body.email} - Teléfono: ${body.phone} - Mensaje: ${body.message}`, // Cuerpo del texto plano
        html: `
        <h2>Nombre: ${body.name}</h2>
        <h3>Email: ${body.email}</h3>
        <p>Teléfono: ${body.phone}</p>
        <p>Mensaje: ${body.message}</p>
        `, // Cuerpo HTML
      })

      logger.info(info)
      res.status(250).json(info)
    } catch (error) {
      logger.error('Error sending email', error)
      res.status(500).json({ error: 'Error sending email' })
    }
  } catch (error) {
    next(error)
  }
})

module.exports = mailRouter
