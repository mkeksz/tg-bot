import {CommandMiddleware} from 'grammy'
import {BotContext} from 'types'
import mainMenu from 'menus/main'

const middleware: CommandMiddleware<BotContext> = async ctx => {
  await ctx.reply(ctx.t('start'), {
    disable_web_page_preview: true,
    reply_markup: mainMenu,
  })
}

export default middleware
