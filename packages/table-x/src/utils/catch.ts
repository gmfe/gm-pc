import React, { ErrorInfo } from 'react'

// catch render error
// 目前 cache 内容如下
// cell.render('Cell') 是一个react组件,如果这个组件return undefined,那就就会报错，这里是坐下兼容
class Catch extends React.Component {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn(error)
    console.warn(errorInfo.componentStack)
  }

  render() {
    return this.props.children
  }
}

export default Catch
