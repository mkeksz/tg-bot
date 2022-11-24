import {Connection, Model} from 'mongoose'
import {mainDB} from 'src/services/database'
import UserSchema, {UserDocument} from './schemas/User'

export type Models = Readonly<{
  User: Model<UserDocument>
}>

export const getConnection = () => {
  const connection = mainDB.connection.get()
  connection.model('User', UserSchema, 'users')
  return connection as Connection & {models: Models}
}
