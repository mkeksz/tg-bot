import {ISession, MongoDBAdapter} from '@grammyjs/storage-mongodb'
import {lazySession} from 'grammy'
import {BotContext, SessionData} from '../types'
import {mainDB} from '../services/database'

const SESSION_COLLECTION_NAME = '_sessions'
const collection = mainDB.connection.get().collection<ISession>(SESSION_COLLECTION_NAME)

// Если нужно добавить новые сессионные свойства в production,
// то также нужно не забыть добавить миграцию новых свойств
// https://grammy.dev/plugins/session.html#migrations
const middleware = lazySession<SessionData, BotContext>({
  initial: () => ({}),
  storage: new MongoDBAdapter({collection}),
})

export default middleware
