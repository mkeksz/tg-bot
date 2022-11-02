import config from '@config'
import Logger from '../services/logger'
import languages from '../constants/languages'

const logger = new Logger(module)
const {env, telegram, database, defaultLanguage} = config

if (!database.uri) throw new Error('database.uri value must be set')
if (!env.isProd && !env.isDev && !env.isTest) {
  throw new Error('NODE_ENV is unknown')
}

const telegramBotTokenRegEx = /^\d+:\S+$/
if (!telegramBotTokenRegEx.test(telegram.botToken)) {
  throw new Error(`telegram.botToken is invalid. Getting "${telegram.botToken}"`)
}
if (env.isProd && !telegram.webhook.domain) {
  logger.warn('telegram.webhook.domain is not set but the application runs in production mode')
}
if (telegram.webhook.domain && !telegram.webhook.port) {
  throw new Error('telegram.webhook.port value must be set if the bot runs with webhook')
}
if (!telegram.webhook.secretToken && env.isProd && telegram.webhook.domain) {
  logger.warn('telegram.webhook.secretToken is not set but the application runs in production mode')
}
if (![443, 80, 88, 8443].includes(telegram.webhook.port)) {
  throw new Error('telegram.webhook.port value must be 443, 80, 88 or 8443')
}
if (!Object.values(languages).includes(defaultLanguage)) {
  throw new Error('defaultLanguage value is incorrect')
}
logger.info('The config is valid')
