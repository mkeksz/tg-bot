import log4js, {Logger as Log4jsLogger} from 'log4js'
import {configureLogger} from './service'
import {getModuleLabel} from './helper'
import config from '@config'

export default class Logger {
  private readonly combinedLogger: Log4jsLogger
  private readonly errorLogger: Log4jsLogger
  private readonly warnLogger: Log4jsLogger
  private readonly moduleLabel: string
  private context: null | string

  public constructor(callingModule: NodeModule) {
    this.context = null
    this.moduleLabel = getModuleLabel(callingModule)
    const logger = configureLogger()
    this.combinedLogger = logger.getLogger('combined')
    this.errorLogger = logger.getLogger('error')
    this.warnLogger = logger.getLogger('warn')
  }

  public init(context: string) {
    this.setContext(context)
    this.combinedLogger.info(this.formatMessage('started'))
  }

  public info(message: string) {
    this.combinedLogger.info(this.formatMessage(message))
  }

  public warn(message: string | Error) {
    this.combinedLogger.warn(this.formatMessage(message))
    this.warnLogger.warn(this.formatMessage(message))
  }

  public error(message: string | Error) {
    this.combinedLogger.error(this.formatMessage(message))
    this.errorLogger.error(this.formatMessage(message))
  }

  public debug(message: string | Error) {
    if (config.log.debug) this.combinedLogger.debug(this.formatMessage(message))
  }

  public success() {
    this.combinedLogger.info(this.formatMessage('succeed'))
  }

  public setContext(context: string) {
    this.context = `(${context})`
  }

  public shutdown(callback: () => void) {
    log4js.shutdown(callback)
  }

  private formatMessage(message: string | Error) {
    const messageAttributes = []
    if (this.moduleLabel) messageAttributes.push(`[${this.moduleLabel}]`)
    if (this.context) messageAttributes.push(this.context)

    const isError = message instanceof Error
    if (config.log.debug && isError) messageAttributes.push(message.stack)
    else if (isError) messageAttributes.push(`${message.name}: ${message.message}`)
    else messageAttributes.push(message)

    return messageAttributes.join(' ')
  }
}
