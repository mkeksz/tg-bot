export interface ConfigParam {
  env: {
    isDev: boolean,
    isProd: boolean,
    isTest: boolean,
  },
  log: {
    errorFile: string,
    combinedFile: string,
    warnFile: string,
    consoleInfo: boolean,
    debug: boolean,
  },
  telegram: {
    botToken: string,
    webhook: {
      domain: string,
      port: number,
      maxConnections: number,
      secretToken: string,
    }
  },
  database: {
    uri: string,
  }
}

export interface BaseConfig {
  CONFIG: ConfigParam
}
