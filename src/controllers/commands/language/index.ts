import {CommandMiddleware} from 'grammy'
import {BotContext} from 'src/types'

const middleware: CommandMiddleware<BotContext> = async ctx => {
  const currentLanguage = await ctx.i18n.getLocale()
  const targetLanguage = currentLanguage === 'en' ? 'ru' : 'en'
  await ctx.i18n.setLocale(targetLanguage)
  await ctx.reply(ctx.t('language'))
}

export default middleware
