import {ErrorHandler, GrammyError, HttpError} from 'grammy'
import Logger from '../services/logger'

const logger = new Logger(module)

const middleware: ErrorHandler = error => {
  logger.setContext(`Error while handling update ${error.ctx.update.update_id}`)
  if (error.error instanceof GrammyError) {
    logger.error(`Error in request: ${error.error.description}`)
  } else if (error.error instanceof HttpError) {
    logger.error('Could not contact Telegram:')
    logger.error(error.error)
  } else logger.error(error)
}

export default middleware
