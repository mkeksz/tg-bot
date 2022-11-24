import MockBot from 'src/tests-helpers/mock-bot'
import {generateTextMessage} from 'src/tests-helpers/message'
import onlyPrivate from 'src/middlewares/only-private/index'

describe('only-private', () => {
  const bot = new MockBot(true)
  const user = {id: 11, first_name: 'Test', is_bot: false}
  const messageText = 'auth-user'

  beforeAll(async () => {
    await bot.prepare()
    bot.grammyBot.use(onlyPrivate).hears(messageText, ctx => ctx.reply('ok'))
  })
  beforeEach(() => bot.reset())
  afterAll(() => bot.end())

  test('private chat', async () => {
    await bot.handleUpdate(generateTextMessage(messageText))
    expect(bot.outgoingRequests.pop()?.payload.text).toBe('ok')
  })

  test('group chat', async () => {
    await bot.handleUpdate(generateTextMessage(messageText, user, 'group'))
    expect(bot.outgoingRequests.length).toBe(0)
  })

  test('supergroup chat', async () => {
    await bot.handleUpdate(generateTextMessage(messageText, user, 'supergroup'))
    expect(bot.outgoingRequests.length).toBe(0)
  })

  test('channel chat', async () => {
    await bot.handleUpdate(generateTextMessage(messageText, user, 'channel'))
    expect(bot.outgoingRequests.length).toBe(0)
  })
})
