import _ from 'lodash'
import { Instance } from '../../../types/common'
import themes from '../../../theme'
import { getMaxFieldStringLength } from './utils'

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
 *
 *  - 交互 interaction
 */

function coordinate(params: Instance) {
  const { chart, options } = params
  const { coordinate } = options
  if (coordinate) {
    // 只做了x,y置换
    if (coordinate.actions) {
      chart.coordinate().transpose()
    }
  }
  return params
}

function geometry(params: Instance) {
  const { chart, options } = params
  let { position, color, adjust, data } = options
  const [x, y, type] = position.split('*') // type只有adjust为facet才会有
  const paddingStep = getMaxFieldStringLength(x, data)
  const geometry = chart.interval().position(position)

  /**
   * 柱状图类型
   *  1. stack 分层(g2原有)
   *  2. dodge 分组(g2原有)
   *  3. rank 排名
   *  4. table
   *  5. facet
   */
  if (adjust) {
    color = color || ''
    const geometryColor = geometry.color(color)
    switch (adjust) {
      case 'dodge':
        geometryColor.adjust({
          type: adjust,
          marginRatio: 0,
        })
        break
      case 'rank':
        geometry.label(y, {
          position: 'left',
          style: {
            fill: '#fff',
          },
          offset: 10,
        })
        chart.axis(x, {
          tickLine: null,
          line: null,
        })
        chart.axis(y, {
          label: null,
          grid: null,
        })
        chart.coordinate().transpose()
        break
      case 'table':
        // table时边距特殊处理
        chart.appendPadding = 0
        chart.axis(x, false)
        chart.axis(y, false)
        chart
          .coordinate()
          .transpose()
          .reflect(y as 'y')
        break
      case 'facet':
        // 分面创建多个图表，前面的配置不适用，清除掉
        chart.clear()
        chart.axis(x, {
          tickLine: null,
          line: null,
          grid: null,
          label: {
            autoEllipsis: true,
          },
        })
        chart.axis(y, false)
        chart.axis(type, false)
        chart.facet('mirror', {
          fields: [type],
          transpose: true,
          showTitle: false,
          padding: [0, paddingStep * 15, 0, 0],
          eachView(view) {
            view
              .interval()
              .position(x + '*' + y)
              .color(type)
              .label(y, {
                position: 'right',
              })
          },
        })
        break
      default:
        geometryColor.adjust(adjust)
        break
    }
  }

  return { ...params, geometry }
}

function scale(params: Instance) {
  const { chart, options } = params
  //  position = x*y
  const { position, adjust, scale } = options
  const [x, y, type] = position.split('*')
  // TODO 通用配置 y轴nice: true
  chart.scale({
    y: {
      nice: true,
    },
    ...scale,
  })

  switch (adjust) {
    case 'facet':
      chart.scale({
        [type]: {
          sync: true,
        },
        [x]: {
          sync: true,
        },
      })
      break

    default:
      break
  }

  return params
}

function annotation(params: Instance) {
  return params
}

function tooltip(params: Instance) {
  const { chart } = params
  chart.tooltip({
    showMarkers: false,
    shared: true,
    domStyles: {
      'g2-tooltip-marker': {
        width: '10px',
        height: '10px',
        borderRadius: '0%',
        display: 'inline-block',
        marginRight: '6px',
      },
    },
  })

  return params
}

function interaction(params: Instance) {
  const { chart, options } = params
  const { color } = options
  if (color) {
    chart.interaction('element-highlight-by-x')
  } else {
    chart.interaction('element-active')
  }
  return params
}

function theme(params: Instance) {
  const { chart, options, geometry } = params
  const { theme, position, coordinate, adjust } = options
  if (theme) {
    const themeConfig = themes[theme as 'ocean'].chart

    if (themeConfig) {
      const [x, y] = position.split('*')
      let fill = themeConfig.bar.style.default.fill

      // -------------- 颜色配置 ---------------
      if (adjust !== 'stack' && adjust !== 'dodge') {
        if (
          coordinate?.actions === 'transpose' ||
          adjust === 'rank' ||
          adjust === 'table'
        )
          fill = themeConfig.bar.style.transpose.fill
        geometry!.style({
          fill,
        })
      }

      // ---------- tiptop配置 ----------------
      if (!adjust || adjust === 'rank' || adjust === 'table') {
        chart.tooltip({
          showMarkers: false,
          shared: true,
          domStyles: {
            'g2-tooltip-marker': {
              display: 'none',
            },
          },
        })
      }

      // ---------- 坐标轴配置 ----------------
      if (adjust !== 'table') {
        chart.axis(y, {
          label: {
            style: {
              fill: themeConfig.bar.axis.label.fill,
            },
          },
        })
        chart.axis(x, {
          label: {
            style: {
              fill: themeConfig.bar.axis.label.fill,
            },
          },
        })
      }
    }
  }
  return params
}

export function processor(params: Instance) {
  return _.flow(
    geometry,
    coordinate,
    interaction,
    annotation,
    tooltip,
    scale,
    theme
  )(params)
}
