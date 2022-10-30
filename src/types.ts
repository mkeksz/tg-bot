import {ParseModeFlavor} from '@grammyjs/parse-mode'
import {Conversation, ConversationFlavor} from '@grammyjs/conversations'
import {Context, LazySessionFlavor} from 'grammy'
import {I18nFlavor} from '@grammyjs/i18n'

export interface SessionData {
  __language_code?: string
}

export type BotContext = ParseModeFlavor<Context & LazySessionFlavor<SessionData> & I18nFlavor
  & ConversationFlavor>

export type BotConversation = Conversation<BotContext>

export type ValueOf<T> = T[keyof T]

