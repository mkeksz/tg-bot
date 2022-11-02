import {hydrateReply, parseMode} from '@grammyjs/parse-mode'
import {conversations} from '@grammyjs/conversations'
import {Bot} from 'grammy'
import * as COMMANDS from './constants/commands'
import errorHandler from './middlewares/errorHandler'
import mongoSession from './middlewares/mongoSession'
import i18n from './middlewares/i18n'
import language from './controllers/commands/language'
import start from './controllers/commands/start'
import {BotContext} from './types'
import config from '@config'
import mainMenu from './inline-menus/main'

const bot = new Bot<BotContext>(config.telegram.botToken)

bot.use(mongoSession)
bot.use(i18n())
bot.use(hydrateReply)
bot.api.config.use(parseMode('HTML'))
// https://grammy.dev/plugins/conversations.html#installing-and-entering-a-conversation
bot.use(conversations())

//https://grammy.dev/plugins/menu.html
bot.use(mainMenu)

bot.command(COMMANDS.START, start)
bot.command(COMMANDS.LANGUAGE, language)

bot.catch(errorHandler)

export default bot
