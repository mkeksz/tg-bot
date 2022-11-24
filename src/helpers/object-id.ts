import mongoose, {Types} from 'mongoose'

export function toObjectID(id: string | Types.ObjectId) {
  let objectID = id
  if (typeof objectID === 'string') objectID = new mongoose.Types.ObjectId(objectID)
  return objectID
}
