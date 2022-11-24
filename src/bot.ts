import {hydrateReply, parseMode} from '@grammyjs/parse-mode'
import {conversations} from '@grammyjs/conversations'
import {Bot} from 'grammy'
import * as COMMANDS from './constants/commands'
import errorHandler from './middlewares/error-handler'
import mongoSession from './middlewares/mongo-session'
import i18n from './middlewares/i18n'
import language from './controllers/commands/language'
import start from './controllers/commands/start'
import {BotContext} from './types'
import config from '@config'
import mainMenu from './inline-keyboards/main'
import onlyPrivate from './middlewares/only-private'
import authUser from './middlewares/auth-user'

const bot = new Bot<BotContext>(config.telegram.botToken)

bot.api.config.use(parseMode('HTML'))

bot.use(onlyPrivate)

bot.use(mongoSession)
bot.use(i18n())
bot.use(hydrateReply)
// https://grammy.dev/plugins/conversations.html#installing-and-entering-a-conversation
bot.use(conversations())

bot.use(authUser)

//https://grammy.dev/plugins/menu.html
bot.use(mainMenu)

bot.command(COMMANDS.START, start)
bot.command(COMMANDS.LANGUAGE, language)
bot.hears('hello', ctx => ctx.reply('hi'))

bot.catch(errorHandler)

export default bot
