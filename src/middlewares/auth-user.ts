import {Middleware} from 'grammy'
import {mainDB} from 'src/services/database'
import {BotContext} from '../types'

const middleware: Middleware<BotContext> = async (ctx, next) => {
  if (!ctx.from?.id) throw new Error('Failed to get from.id')
  const locale = await ctx.i18n.getLocale()
  ctx.user = await mainDB.methods.user.findOrCreate(ctx.from.id, locale)
  await next()
}

export default middleware
