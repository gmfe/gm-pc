/**
 * 具体图表的样式
 * registerTheme只能修改通用的样式，不同图表之前的差异不能在主题中修改，所以有此文件，针对不同图表修改样式
 */
export const chartStyleSheet = (PRIMARY_COLORS: Record<number, string>) => {
  return {
    line: {
      shape: 'smooth',
      style: {
        stroke: PRIMARY_COLORS[15],
        shadowBlur: 30,
        shadowColor: PRIMARY_COLORS[15],
        shadowOffsetY: 0,
      },
      area: {
        shape: 'smooth',
        fill: `l(90) 0:${PRIMARY_COLORS[45]} 0.9:rgba(0,0,0,0)`,
        fillOpacity: 1,
      },
    },
    pie: {
      ghost: true, // pie底部的阴影
    },
    bar: {
      style: {
        default: {
          fill: `l(90) 0:${PRIMARY_COLORS[15]} 0.9:${PRIMARY_COLORS[25]}`,
        },
        transpose: {
          fill: `l(180) 0:${PRIMARY_COLORS[15]} 0.8:${PRIMARY_COLORS[25]}`,
        },
      },
      axis: {
        label: {
          fill: '#e2e2ea',
        },
      },
    },
  }
}
