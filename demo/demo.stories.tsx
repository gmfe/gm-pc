import React from 'react'

import { observable } from 'mobx'

const store = observable({
  data: [1, 2],
})

export const demo = () => {
  return <div>demo {store.data}</div>
}

export default {
  title: 'DEMO|DEMO',
}

interface Props<V> {
  value: V
}

const Com = <V,>(props: Props<V>) => {
  return <div>{props.value}</div>
}
