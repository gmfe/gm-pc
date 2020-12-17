import { registerTheme } from '@antv/g2'
import theme, { createThemeByStyleSheet } from './theme'

// 注册深蓝主题
registerTheme('ocean', createThemeByStyleSheet(theme.ocean))
// 注册橙色主题
registerTheme('sunset', createThemeByStyleSheet(theme.sunset))

export { Line } from './chart/line/index'
export { Pie } from './chart/pie/index'
export { Bar } from './chart/bar/index'
