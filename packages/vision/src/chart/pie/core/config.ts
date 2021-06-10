import _ from 'lodash'
import { getEngine } from '@antv/g2'
import { Instance } from '../../../types/common'
import themes from '../../../theme'

const G = getEngine('canvas')

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
  const { position, color, data } = options
  // 对Pie的数据进行百分比处理
  const total = data.reduce((t: number, c: any) => t + c[position], 0)
  const newData = data.map((d) => {
    d[position] = +((d[position] / total) * 100).toFixed(2)
    return d
  })
  chart.data(newData)
  const geometry = chart.interval().position(position).adjust('stack')
  geometry.color(color)

  return { ...params, geometry }
}

function coordinate(params: Instance) {
  const { chart } = params
  chart.coordinate('theta', {
    radius: 0.75,
    innerRadius: 0.6,
  })
  return params
}

function interaction(params: Instance) {
  const { chart } = params
  chart.interaction('element-active')
  return params
}

function scale(params: Instance) {
  const { chart, options } = params
  //  position = x*y
  const { position } = options
  const y = position.split('*')[1]
  // TODO 通用配置 y轴nice: true
  chart.scale(y, {
    nice: true,
  })

  return params
}

function axis(params: Instance) {
  const { options, geometry } = params
  let { position, label = true, color } = options

  if (label) {
    label =
      label === true
        ? (data: Record<string, any>) => {
            return `${data[color]}`
          }
        : label
    geometry!.label(position[1], {
      content: label,
    })
  }
  return params
}

function annotation(params: Instance) {
  return params
}

function tooltip(params: Instance) {
  const { chart } = params
  // tooltip样式
  chart.tooltip({
    showTitle: false,
    showMarkers: false,
    itemTpl:
      '<li class="g2-tooltip-list-item"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>',
  })

  return params
}

function legend(params: Instance) {
  const { chart, options } = params
  const { color, legend } = options

  if (!_.isNil(legend)) {
    chart.legend(legend)
  } else {
    chart.legend(color, {
      position: 'right',
    }) // 只更改 x 维度对应的图例的显示位置
  }

  return params
}

function theme(params: Instance) {
  const { geometry, options, chart } = params
  const { theme, position } = options
  const themeConfig = themes[theme as 'ocean']?.chart
  chart.tooltip({
    showTitle: false,
    showMarkers: false,
    itemTpl: '<li class="g2-tooltip-list-item">{name}: {value}%</li>',
  })
  if (themeConfig) {
    const { ghost } = themeConfig.pie

    if (ghost) {
      // ---------- 标注配置 -----------------
      chart.annotation().shape({
        top: false,
        render: (container, chart, c) => {
          const group = container.addGroup({})
          const center = { x: c.parsePosition({}).x, y: chart.height / 2 } // NOTE: ts报错应该是antv的类型定义有问题，明明有这个属性
          // 外圈
          group.addShape({
            type: 'circle',
            attrs: {
              x: center.x,
              y: center.y,
              r: chart.height / 2 - 35 - chart.appendPadding[0] / 2,
              fill: '#15347f', // TODO 颜色配置都扔到/theme目录下
            },
          })
          // 内圈
          group.addShape({
            type: 'circle',
            attrs: {
              x: center.x,
              y: center.y,
              r: chart.height / 2 - 80,
              fill: '#030646',
            },
          })
        },
      })
    }

    // ---------- tiptop配置 ----------------
    chart.tooltip({
      showTitle: false,
      showMarkers: false,
      itemTpl: '<li class="g2-tooltip-list-item">{name}: {value}%</li>',
    })

    geometry!.label(position, {
      offset: '80%',
      labelLine: null,
      content: (a, b) => {
        const group = new G.Group({})
        group.addShape({
          type: 'text',
          position: 'relative',
          attrs: {
            x: 0,
            y: 0,
            textBaseline: 'top',
            text: a.item,
            fontSize: 12,
            fill: b.color,
          },
        })
        return group
      },
    })
  }
}

export function processor(params: Instance) {
  return _.flow(
    geometry,
    coordinate,
    interaction,
    axis,
    legend,
    annotation,
    tooltip,
    scale,
    theme
  )(params)
}
