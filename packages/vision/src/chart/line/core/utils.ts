import _ from 'lodash'
import { ChartOptions } from '../../../types/common'

export function flatData(data: any, x: string, position: string[] | string[][]) {
  const result: { [key: string]: any }[] = []
  _.forEach(data, (item) => {
    _.forEach(position, (pos) => {
      let y = ''
      let type = y
      if (_.isArray(pos)) {
        type = pos[1]
        y = pos[0]
      } else {
        y = (pos as string).split('*')[1]
      }

      result.push({
        [x]: item[x],
        value: item[y],
        type,
      })
    })
  })
  return result
}

export function getPosition(xFieldName: string, yFieldName: string[][]) {
  const position: string[] = []
  yFieldName.map((field) => {
    const name = field[0]
    position.push(`${xFieldName}*${name}`)
  })
  return position
}

export function getPositionAndColor(params: ChartOptions) {
  const { options } = params
  const { position, color, xFieldName, theme } = options
  const x = position ? position[0].split('*')[0] : xFieldName

  if (_.isArray(position) || !position) {
    return {
      position: `${x}*value`,
      color: 'type',
    }
  } else {
    return { position, color }
  }
}
