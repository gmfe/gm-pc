import { pinyin } from '@gm-common/tool'
import _ from 'lodash'

export const getCustomizedCode = (text: string): string => {
  if (!text) {
    return ''
  }

  const code: string = _.map(text, (t) => pinyin(t)[0]).join('')
  return code
}
