import { Chart } from '@antv/g2'
import { bind } from 'size-sensor'
import { ChartOptions, Instance } from '../../types/common'
import { getContainerSize } from '../../common/utils/dom'
import _ from 'lodash'

export abstract class Base {
  chart: Chart

  options: ChartOptions

  container: HTMLElement

  unbind: (() => void) | undefined

  abstract name: string

  /**
   * 处理配置，geometry annotation axis...
   * */
  abstract getProcessor(): (params: Instance) => Instance

  constructor(container: string | HTMLElement, options: ChartOptions) {
    this.container =
      typeof container === 'string'
        ? (document.querySelector(container)! as HTMLElement)
        : container
    this.options = options
    this.chart = null!
    this.unbind = undefined

    this.createG2()

    this.bindSizeSensor()
  }

  createG2() {
    const { width, height, padding } = this.options
    // 通用配置
    this.chart = new Chart({
      container: this.container,
      width,
      height,
      autoFit: false,
      appendPadding: padding || [24, 24, 24, 24],
    })
  }

  initConfig() {
    let { data, theme = '', position } = this.options
    data = this.processData(data, position)

    this.chart.data(data).theme(theme)

    const processor = this.getProcessor()
    processor({
      chart: this.chart,
      options: this.options,
    })
  }

  processData(data: any, position: string) {
    if (position) {
      const [x, y] = position.split('*')
      // 数字要转成number类型，antv要求
      return _.map(data, (d) => {
        d[x] = _.isNaN(+d[x]) ? d[x] : +d[x]
        d[y] = _.isNaN(+d[y]) ? d[y] : +d[y]
        return d
      })
    }
    return data
  }

  render() {
    this.chart.clear()

    this.initConfig()

    this.chart.render()
  }

  updateOptions(options: ChartOptions) {
    this.options = _.merge(options, this.options)
    this.render()
  }

  updateData(data: any) {
    this.options.data = data
    this.render()
  }

  unbindSizeSensor() {
    if (this.unbind) {
      this.unbind()
      this.unbind = undefined
    }
  }

  bindSizeSensor() {
    if (this.unbind) {
      return
    }

    const { autoFit = true } = this.options
    if (autoFit) {
      this.unbind = bind(this.container, () => {
        // 获取最新的宽高信息
        const { width, height } = getContainerSize(this.container)

        // 主要是防止绑定的时候触发 resize 回调
        if (width !== this.chart.width || height !== this.chart.height) {
          this.triggerResize()
        }
      })
    }
  }

  triggerResize() {
    // 解决pie宽高变化后导致annotation没有重写render
    if (this.name === 'pie') {
      this.render()
    }
    this.chart.forceFit()
  }

  destroy() {
    this.unbindSizeSensor()
    this.chart.destroy()
  }

  resize() {
    this.chart.forceFit()
  }
}
