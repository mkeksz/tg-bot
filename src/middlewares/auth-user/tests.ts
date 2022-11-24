import MockBot from 'src/tests-helpers/mock-bot'
import {generateTextMessage} from 'src/tests-helpers/message'
import {getConnection} from 'src/services/database/main'
import authUser from './index'
import i18n from 'src/middlewares/i18n'

describe('auth-user', () => {
  const bot = new MockBot(true)
  const telegramID = 11
  const messageText = 'auth-user'

  beforeAll(async () => {
    await bot.prepare()
    bot.grammyBot.use(i18n()).use(authUser).hears(messageText)
  })
  beforeEach(() => bot.reset())
  afterAll(() => bot.end())

  test('new user', async () => {
    await bot.handleUpdate(generateTextMessage(messageText))
    const {User} = getConnection().models
    const user = await User.findOne({telegramID})
    expect(user).toMatchObject({telegramID: telegramID.toString(), language: 'en'})
  })

  test('old user, update language', async () => {
    const {User} = getConnection().models
    await User.deleteMany()
    await User.create({telegramID, language: 'en'})
    await bot.handleUpdate(
      generateTextMessage(messageText, {
        language_code: 'ru',
        first_name: 'test',
        is_bot: false,
        id: telegramID,
      })
    )
    const user = await User.findOne({telegramID})
    expect(user).toMatchObject({telegramID: telegramID.toString(), language: 'ru'})
  })
})
