import {Update, User} from 'grammy/types'
import _ from 'lodash'

export function generateTextMessage(
  text: string,
  from: User = {id: 11, first_name: 'Test', is_bot: false},
  chatType: 'private' | 'group' | 'supergroup' | 'channel' = 'private'
): Update {
  return {
    update_id: 10000,
    message: {
      date: 1441645532,
      message_id: 1365,
      chat:
        chatType === 'private'
          ? {..._.omit(from, ['is_bot']), type: 'private'}
          : {type: chatType, id: -12, title: 'Test Group'},
      from,
      text,
    },
  }
}
