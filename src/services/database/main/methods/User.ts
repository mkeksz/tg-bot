import {Types} from 'mongoose'
import {getConnection} from '../index'

export async function findOrCreate(telegramID: string | number, language?: string) {
  const {User} = getConnection().models
  return User.findOneAndUpdate(
    {telegramID},
    {telegramID, language},
    {upsert: true, new: true},
  )
}

export async function findByID(id: Types.ObjectId) {
  const {User} = getConnection().models
  return User.findById(id).lean()
}
