import {Menu} from '@grammyjs/menu'
import {BotContext} from 'types'

export default new Menu<BotContext>('main')
  .text('A', ctx => ctx.reply('You pressed A!')).row()
  .text('B', ctx => ctx.reply('You pressed B!'))
