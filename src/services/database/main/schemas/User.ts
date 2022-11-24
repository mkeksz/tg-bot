import {Schema, Document} from 'mongoose'
import languages from 'src/constants/languages'
import {ValueOf} from 'src/types'
import config from '@config'

export interface User {
  telegramID: string,
  language: ValueOf<typeof languages>,
}

export type UserDocument = Document & User

export default new Schema<UserDocument>(
  {
    telegramID: {type: String, required: true, unique: true},
    language: {
      type: String,
      enum: Object.values(languages),
      default: config.defaultLanguage,
      required: true,
    },
  },
  {timestamps: true},
)
