import { createContext } from 'react'
import { FontSizeType } from './config_provider'

export interface ConfigConsumerProps {
  fontSize?: FontSizeType
}

export const ConfigContext = createContext<ConfigConsumerProps>({})

export const ConfigConsumer = ConfigContext.Consumer
