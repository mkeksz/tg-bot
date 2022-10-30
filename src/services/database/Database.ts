import mongoose from 'mongoose'
import Logger from '../logger'

const logger = new Logger(module)

export default class Database {
  private readonly uri: string
  private readonly name: string
  public readonly connection: mongoose.Connection

  public constructor(uri: string, name: string) {
    this.uri = uri
    this.name = name
    logger.info(`Start connection to ${name}`)
    this.connection = mongoose.createConnection(this.uri)
    this.setEventHandlersToConnection()
  }

  public async waitConnection() {
    logger.info(`Waiting for connection to ${this.name}...`)
    await this.connection.asPromise()
  }

  public async disconnect() {
    if (!this.connection) return
    await this.connection.close()
  }

  private setEventHandlersToConnection() {
    this.connection.on('disconnected', () => logger.info(`Disconnected from ${this.name}`))
    this.connection.on('close', () => logger.info(`Closed connection to ${this.name}`))
    this.connection.on('reconnected', () => logger.info(`Reconnected to ${this.name}`))
    this.connection.on('connected', () => logger.info(`Connected to ${this.name}`))
    this.connection.on('error', logger.error)
  }
}
