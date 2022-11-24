import {Middleware} from 'grammy'
import {BotContext} from '../types'

const middleware: Middleware<BotContext> = async (ctx, next) => {
  await ctx.conversation.exit()
  await next()
}

export default middleware
