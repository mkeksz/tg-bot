import {Schema, Document} from 'mongoose'
import languages from 'constants/languages'
import {ValueOf} from 'types'
import config from '@config'

export interface User extends Document {
  telegramID: string,
  language: ValueOf<typeof languages>,
}

export default new Schema<User>(
  {
    telegramID: {type: String, required: true},
    language: {
      type: String,
      enum: Object.values(languages),
      default: config.defaultLanguage,
      required: true,
    },
  },
  {timestamps: true},
)
