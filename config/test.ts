import {BaseConfig} from './types'

export default {
  CONFIG: {
    database: {
      uri: 'mongodb://localhost:27017/test',
    },
    telegram: {
      botToken: 'test',
    },
  },
} as BaseConfig
