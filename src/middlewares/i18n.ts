import {I18n} from '@grammyjs/i18n'
import languages from 'constants/languages'
import Logger from 'services/logger'

const logger = new Logger(module)

export default () => new I18n({
  defaultLocale: languages.EN,
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
