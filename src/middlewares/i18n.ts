import {I18n} from '@grammyjs/i18n'
import Logger from 'services/logger'
import config from '@config'

const logger = new Logger(module)

export default () => new I18n({
  defaultLocale: config.defaultLanguage,
  directory: 'src/locales',
  useSession: true,
  fluentOptions: {
    warningHandler: {
      handleWarning: warning => {
        logger.error(`type: ${warning.type}, path: ${warning.path}, locales: ${warning.locales}`)
      },
    },
  },
})
