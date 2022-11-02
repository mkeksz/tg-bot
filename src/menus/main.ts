import {Menu} from '@grammyjs/menu'
import {BotContext} from 'types'
import pressedA from 'controllers/menu-actions/pressed-a'
import pressedB from 'controllers/menu-actions/pressed-b'

export default new Menu<BotContext>('main')
  .text('A', pressedA).row()
  .text('B', pressedB)
