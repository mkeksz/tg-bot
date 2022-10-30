import {Model} from 'mongoose'
import {main} from 'services/database'
import UserSchema, {User} from './schemas/User'

export const getConnection = () => {
  const connection = main.database.connection
  connection.model('User', UserSchema, 'users')
  return connection
}

export type Models = Readonly<{
  User: Model<User>,
}>
