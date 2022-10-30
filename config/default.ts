import * as path from 'path'
import {BaseConfig} from './types'

const NODE_ENV = process.env['NODE_ENV']
const isDev = NODE_ENV === 'development'
const isProd = NODE_ENV === 'production'
const isTest = NODE_ENV === 'test'

export default {
  CONFIG: {
    env: {isDev, isTest, isProd},
    log: {
      errorFile: path.resolve('logs/errors.log'),
      combinedFile: path.resolve('logs/combined.log'),
      warnFile: path.resolve('logs/warns.log'),
      consoleInfo: isDev || isTest,
      debug: isDev || isTest,
    },
    telegram: {
      botToken: String(process.env['BOT_TOKEN']),
      webhook: {
        domain: process.env['WEBHOOK_DOMAIN'],
        port: Number(process.env['PORT']) || 8443,
        maxConnections: 40,
        secretToken: process.env['WEBHOOK_SECRET_TOKEN'],
      },
    },
    database: {
      uri: process.env['DATABASE_URI'],
    },
  },
} as BaseConfig
