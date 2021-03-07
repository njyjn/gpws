require('dotenv').config()

import express, { NextFunction, Response, } from 'express'
import bodyParser from 'body-parser'
import { sequelize } from './sequelize';
import { IndexRouter } from './controllers/v0/index.router';
import { isGpwsAuthorized } from './auth'
import { error_handler } from './error'

import { V0MODELS } from './controllers/v0/model.index'

(async() => {
  await sequelize.addModels(V0MODELS);
  await sequelize.sync({ force: true })

  const app = express()
  const port = 3001

  app.use(bodyParser.json())

  // Guard index router with auth middleware
  app.use('/api/v0', isGpwsAuthorized, IndexRouter);
  
  app.listen(port, () => {
    console.log(`ALETHEON General Purpose Web Server listening at http://localhost:${port}`)
  })
})();
