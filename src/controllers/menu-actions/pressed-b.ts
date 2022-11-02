import {CallbackQueryMiddleware} from 'grammy'
import {BotContext} from 'src/types'

const middleware: CallbackQueryMiddleware<BotContext> = async ctx => {
  await ctx.reply('You pressed B!')
}

export default middleware
