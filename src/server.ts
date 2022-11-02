import express, {Request, Response, NextFunction} from 'express'
import {webhookCallback} from 'grammy'
import * as http from 'http'
import Logger from './services/logger'
import config from '@config'
import bot from './bot'

const webhook = config.telegram.webhook
const logger = new Logger(module)

const app = express()
app.disable('x-powered-by')
app.use(express.json())
app.use(webhookCallback(bot, 'express', {secretToken: webhook.secretToken}))

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (!error) next()
  logger.error(error)
  res.sendStatus(500)
  next()
})

export function startServer() {
  http.createServer(app).listen(webhook.port, async () => {
    await bot.api.setWebhook(webhook.domain, {
      max_connections: webhook.maxConnections,
      secret_token: webhook.secretToken,
    })
    logger.info(`The bot is running with webhook on ${webhook.domain}. Port is ${webhook.port}`)
  })
}
