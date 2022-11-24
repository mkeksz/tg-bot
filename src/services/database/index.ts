import * as userMethods from './main/methods/User'
import Connection from './Connection'
import config from '@config'

class MainConnection extends Connection {
  public constructor() {
    super(config.database.uri, 'main')
  }
}

export const mainDB = {
  connection: new MainConnection(),
  methods: {
    user: userMethods,
  },
}
