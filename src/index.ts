import 'helpers/config-checker'
import Logger from 'services/logger'
import config from '@config'
import bot from 'bot'
import {startServer} from 'server'
import {main} from 'services/database'
import commands from 'constants/commands-menu'

const logger = new Logger(module)

const afterConnection = () => {
  if (config.telegram.webhook.domain) return startServer()
  const onStart = () => logger.info('The bot is running with long polling')
  bot.start({onStart}).catch(onUncaughtException)
  bot.api.setMyCommands(commands).catch(onUncaughtException)
}
main.database.waitConnection().then(afterConnection).catch(onUncaughtException)
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
  await main.database.disconnect()
  logger.info('The bot was stopped')
}
