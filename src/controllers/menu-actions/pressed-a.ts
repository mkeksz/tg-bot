import {CallbackQueryMiddleware} from 'grammy'
import {BotContext} from 'types'

const middleware: CallbackQueryMiddleware<BotContext> = async ctx => {
  await ctx.reply('You pressed A!')
}

export default middleware
