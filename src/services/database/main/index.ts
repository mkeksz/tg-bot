import {Connection, Model} from 'mongoose'
import {mainDB} from 'src/services/database'
import UserSchema, {UserDocument} from './schemas/User'
import SessionSchema, {SessionDocument} from './schemas/Session'

export type Models = Readonly<{
  User: Model<UserDocument>
  Session: Model<SessionDocument>
}>

export const getConnection = () => {
  const connection = mainDB.connection.get()
  connection.model('User', UserSchema, 'users')
  connection.model('Session', SessionSchema, '_sessions')
  return connection as Connection & {models: Models}
}
