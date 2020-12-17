import _ from 'lodash'
import { Instance } from '../../../types/common'
import { flatData, getPositionAndColor } from './utils'
import themes from '../../../theme'

/**
 * Geek Blue 极客蓝 #5B8FF9
 * Cyan 翡翠绿 #5AD8A6
 * Grey 商务灰 #5D7092
 * Sunrise Yellow 旭日黄 #F6BD16
 * Dust Red 薄暮红 #E86452
 * Daybreak Blue 破晓蓝 #6DC8EC
 * Golden Purple 罗兰紫 #945FB9
 * Sunset Orange 落日橘 #FF9845
 * Dark Green 天水青 #1E9493
 * Magenta 桃花粉 #FF99C3
 */
const colors = [
  '#5B8FF9',
  '#5AD8A6',
  '#5D7092',
  '#F6BD16',
  '#E86452',
  '#6DC8EC',
  '#945FB9',
  '#FF9845',
  '#1E9493',
  '#FF99C3',
]

/**
 *  - 几何标记 Geometry
 *  - 度量 Scale
 *  - 坐标系 Coordinate
 *  - 可视化组件 Component
 *    - 包括坐标轴 Axis，
 *    - 图例 Legend，
 *    - 提示信息 Tooltip，
 *    - 图形标记 Annotation，
 *    - 滑动条 Slider 等。
 */

function geometry(params: Instance) {
  const { chart, options } = params

  const { position, color } = getPositionAndColor(params)

  let geometry
  if (color) {
    geometry = chart.line().position(position).color(color)
  } else {
    geometry = chart.line().position(position)
  }

  return { ...params, geometry }
}

function scale(params: Instance) {
  const { chart, options } = params

  const { position, data, xFieldName, yFieldName, scale = {} } = options
  if (_.isArray(position) || !position) {
    if (data.length) {
      const x = position ? position[0].split('*')[0] : xFieldName
      const d = flatData(data, x, yFieldName)
      chart.scale({
        value: {
          nice: true,
          formatter: (value) => value,
        },
        ...scale,
      })
      chart.scale({
        [x]: {
          nice: true,
          formatter: (value) => value,
        },
        ...scale,
      })
      chart.data(d)
    }
  } else {
    const y = position.split('*')[1]
    // TODO 通用配置 y轴nice: true
    chart.scale({
      [y]: {
        nice: true,
      },
      ...scale,
    })
  }

  return params
}

function axis(params: Instance) {
  const { chart, options } = params
  const { position, color } = options
  if (_.isArray(position)) {
    chart.axis('value', {
      label: {
        formatter: (text) => text,
      },
    })
  }
  return params
}

function annotation(params: Instance) {
  const { chart, options } = params
  const { data, annotation } = options
  // 辅助线
  if (annotation) {
    const { text, value } = annotation
    const yPosition = typeof value === 'string' ? value : value(data)
    chart.annotation().line({
      start: ['min', yPosition],
      end: ['max', yPosition],
      style: {
        stroke: 'red',
        lineWidth: 1,
        lineDash: [3, 3],
      },
      text: {
        position: 'right',
        content: text,
      },
    })
  }

  return params
}

function tooltip(params: Instance) {
  const { chart } = params
  // tooltip样式
  chart.tooltip({
    showMarkers: true,
    showCrosshairs: true,
    shared: true,
    domStyles: {
      'g2-tooltip-marker': {
        width: '10px',
        height: '2px',
        borderRadius: '0%',
        display: 'inline-block',
        marginBottom: '4px',
        marginRight: '6px',
      },
    },
  })

  return params
}

function legend(params: Instance) {
  const { chart, options } = params
  const { legend } = options

  if (legend !== undefined) {
    chart.legend(legend)
  }

  return params
}

function theme(params: Instance) {
  const { chart, options, geometry } = params
  const { theme } = options
  if (theme) {
    const themeConfig = themes[theme as 'ocean'].chart

    if (themeConfig) {
      // ---------- geometry配置 ----------------
      geometry!.shape(themeConfig.line.shape).style(themeConfig.line.style)

      // ---------- tiptop配置 ----------------
      chart.tooltip({
        showMarkers: true,
        showCrosshairs: true,
        shared: true,
        domStyles: {
          'g2-tooltip-marker': {
            display: 'none',
          },
        },
      })

      // ---------- area图 ----------------
      if (themeConfig.line.area) {
        const { position, color } = getPositionAndColor(params)
        chart
          .area()
          .position(position)
          .color(color)
          .shape(themeConfig.line.area.shape)
          .style({
            fill: themeConfig.line.area.fill,
            fillOpacity: 1,
          })
      }
    }
  }
  return params
}

export function processor(params: Instance) {
  return _.flow(geometry, annotation, tooltip, scale, axis, legend, theme)(params)
}
