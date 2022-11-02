import * as COMMANDS from './commands'

interface BotCommand {
  command: string,
  description: string
}

export const LANGUAGE: BotCommand = {
  command: COMMANDS.LANGUAGE,
  description: 'Change the language',
}

export default [LANGUAGE] as BotCommand[]
