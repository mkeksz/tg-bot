import {Schema, Document} from 'mongoose'

export interface Session {
  key: string
}

export type SessionDocument = Document & Session

export default new Schema<SessionDocument>({
  key: String,
})
