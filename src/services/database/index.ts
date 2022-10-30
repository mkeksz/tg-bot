import * as User from './main/methods/User'
import Database from './Database'
import config from '@config'

class MainDatabase extends Database {
  public constructor() {
    super(config.database.uri, 'main')
  }
}

export const main = {
  database: new MainDatabase(),
  methods: {User},
}
