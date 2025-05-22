import express, { Express, json } from 'express'
import cors from 'cors'
import { AppealRouter } from './modules/appeals/appeals.router'
import { errorHandler } from './middlewares/error.middleware'

export const createApp = (): Express => {
  const app = express()

  // Middlewares
  app.use(cors())
  app.use(json())

  // Routes
  app.use(AppealRouter)


  //error middleware
  app.use(errorHandler)

  return app
}
