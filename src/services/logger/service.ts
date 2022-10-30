import log4js, {Configuration} from 'log4js'
import config from '@config'

export function configureLogger() {
  const configuration: Configuration = {
    appenders: {
      error: {type: 'file', filename: config.log.errorFile, maxLogSize: '10M'},
      warn: {type: 'file', filename: config.log.warnFile, maxLogSize: '10M'},
      combined: {type: 'file', filename: config.log.combinedFile, maxLogSize: '10M'},
      console: {type: 'console'},
    },
    categories: {
      error: {appenders: ['error'], level: 'ERROR'},
      warn: {appenders: ['warn'], level: 'WARN'},
      default: {appenders: ['combined'], level: 'ALL'},
    },
  }
  if (config.log.consoleInfo) configuration.categories['default']?.appenders.push('console')
  else {
    configuration.categories['warn']?.appenders.push('console')
    configuration.categories['error']?.appenders.push('console')
  }
  log4js.configure(configuration)
  return log4js
}
