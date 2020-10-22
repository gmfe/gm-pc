import { pinyin } from '@gm-common/tool'
import _ from 'lodash'

export const getCustomizedCode = (text: string): string => {
  if (!text) {
    return ''
  }

  const code: string = _.map(text, (t) => pinyin(t)[0]).join('')
  const random: number = Math.floor(Math.random() * 10000)
  return `${code}${random}`
}
