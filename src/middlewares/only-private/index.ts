import {Middleware} from 'grammy'

const middleware: Middleware = async (ctx, next) => {
  if (ctx.chat?.type !== 'private') return
  await next()
}

export default middleware
