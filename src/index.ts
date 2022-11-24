import './helpers/config-checker'
import Logger from './services/logger'
import config from '@config'
import bot from './bot'
import {startServer} from './server'
import {mainDB} from './services/database'
import commands from './constants/commands-menu'

const logger = new Logger(module)

mainDB.connection.wait()
  .then(() => {
    if (config.telegram.webhook.domain) return startServer()
    bot.start({onStart: () => logger.info('The bot is running with long polling')})
      .catch(onUncaughtException)
    bot.api.setMyCommands(commands).catch(onUncaughtException)
  })
  .catch(onUncaughtException)

process.on('uncaughtException', onUncaughtException)

const signals = ['SIGINT', 'SIGTERM', 'SIGQUIT']
signals.forEach(signal => {
  process.once(signal, async () => {
    logger.info(`Caught signal ${signal}`)
    await stop()
    logger.shutdown(() => process.exit(0))
  })
})

async function onUncaughtException(error: Error) {
  logger.setContext('Uncaught Exception')
  logger.error(error)
  await stop()
  logger.shutdown(() => process.exit(1))
}

async function stop() {
  await bot.stop()
  await mainDB.connection.disconnect()
  logger.info('The bot was stopped')
}
