import languages from 'src/constants/languages'
import {ValueOf} from 'src/types'
import {Models, getConnection} from '../index'

export function create(telegramID: string, language?: ValueOf<typeof languages>) {
  const {User} = getConnection().models as Models
  return User.create({telegramID, language})
}
