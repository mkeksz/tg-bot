import {ConfigParam} from './types'
import nodeConfig from 'config'

export default nodeConfig.get('CONFIG') as ConfigParam
