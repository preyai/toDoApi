import express, { Express, Request, Response } from 'express'
import config from 'config'
import taskRouter from './src/routes/tasks.routes'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors, { CorsOptions } from 'cors'
import { localAuth } from './src/lib/authentication'

const host: string = config.get('server.host')
const port: string = config.get('server.port')
const mongoUri: string = config.get('database.uri')

const app: Express = express()

const whitelist = ["http://localhost:3000"]
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

app.use(bodyParser.json())

app.use('/tasks', taskRouter)

app.post('/login', localAuth)

mongoose.connect(mongoUri)
  .then(() => {
    console.log('db connected');
    
    try {
      app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at https://${host}:${port}`)
      })
    } catch (error) {
      console.log(error)
    }
  })
