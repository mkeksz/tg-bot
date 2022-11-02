import {Connection, Model} from 'mongoose'
import {main} from 'src/services/database'
import UserSchema, {User} from './schemas/User'

export type Models = Readonly<{
  User: Model<User>,
}>

export const getConnection = () => {
  const connection = main.database.connection
  connection.model('User', UserSchema, 'users')
  return connection as Connection & {models: Models}
}
