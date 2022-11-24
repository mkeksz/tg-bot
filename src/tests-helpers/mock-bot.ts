import {Methods, Payload} from 'node_modules/grammy/out/core/client'
import {Bot, RawApi} from 'grammy'
import {mainDB} from 'src/services/database'
import {BotContext} from 'src/types'
import {getConnection} from 'src/services/database/main'
import {Update} from 'grammy/types'
import bot from 'src/bot'
import config from '@config'

type OutgoingRequest = {
  method: Methods<RawApi>
  payload: Payload<Methods<RawApi>, RawApi> & {text?: string}
  signal: {aborted: boolean} | undefined
}

export default class MockBot {
  public outgoingRequests: OutgoingRequest[]
  public readonly grammyBot: Bot<BotContext>

  public constructor(newBot = false) {
    this.outgoingRequests = []
    this.grammyBot = newBot ? new Bot(config.telegram.botToken) : bot
  }

  public async prepare() {
    await mainDB.connection.wait()
    // @ts-ignore
    this.grammyBot.api.config.use((prev, method, payload, signal) => {
      this.outgoingRequests.push({method, payload, signal})
      return {ok: true, result: true}
    })

    this.grammyBot.botInfo = {
      id: 42,
      first_name: 'Test Bot',
      is_bot: true,
      username: 'bot',
      can_join_groups: false,
      can_read_all_group_messages: false,
      supports_inline_queries: false,
    }
    await this.grammyBot.init()
  }

  public reset() {
    this.outgoingRequests = []
  }

  public async end() {
    const {User, Session} = getConnection().models
    await User.deleteMany()
    await Session.deleteMany()
    await mainDB.connection.disconnect()
  }

  public async handleUpdate(update: Update) {
    await this.grammyBot.handleUpdate(update)
  }
}
