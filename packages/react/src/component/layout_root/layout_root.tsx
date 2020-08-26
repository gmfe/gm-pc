import React, { FC, ReactElement, useEffect, useState } from 'react'
import _ from 'lodash'
import {
  Type,
  SetComponentFunc,
  State,
  LayoutRootStatic,
  ComponentListItem,
} from './type'

let setComponentFunc: SetComponentFunc = null

const LayoutRoot: FC & LayoutRootStatic = () => {
  const [state, setState] = useState<State>({})

  useEffect(() => {
    setComponentFunc = (type, component) => {
      setState((s) => ({
        ...s,
        [type]: component,
      }))
    }

    return () => {
      setComponentFunc = null
    }
  })

  const { drawer, popover, modal, tip, full_loading, n_progress } = state

  return (
    <div>
      {popover && popover.length > 0 && (
        <div>
          {_.map(popover, (v: ComponentListItem) =>
            React.cloneElement(v.com as ReactElement, {
              key: v.id,
            })
          )}
        </div>
      )}

      {drawer && <div>{drawer}</div>}
      {modal && <div>{modal}</div>}

      {tip && tip.length > 0 && (
        <div className='gm-tips'>
          {_.map(tip, (v: ComponentListItem) =>
            React.cloneElement(v.com as ReactElement, {
              key: v.id,
            })
          )}
        </div>
      )}

      {full_loading && <div>{full_loading}</div>}

      {n_progress && <div>{n_progress}</div>}
    </div>
  )
}

const componentListMap: {
  popover: ComponentListItem[]
  tip: ComponentListItem[]
} = {
  popover: [],
  tip: [],
}

LayoutRoot.setComponentArray = (type, id, com) => {
  // @ts-ignore
  const list: ComponentListItem[] = componentListMap[type]

  if (setComponentFunc) {
    const index = _.findIndex(list, (v) => v.id === id)

    if (com) {
      if (index === -1) {
        list.push({ id, com })
      } else {
        list[index] = { id, com }
      }
    } else {
      _.remove(list, (v) => v.id === id)
    }

    setComponentFunc(type, list)
  } else {
    console.warn('LayoutRoot is uninitialized')
  }
}

LayoutRoot.removeComponentArray = (type, id) => {
  LayoutRoot.setComponentArray(type, id, undefined)
}

LayoutRoot.clearComponentArray = (type) => {
  LayoutRoot.setComponent(type, [])
}

LayoutRoot.setComponent = (type, com) => {
  if (setComponentFunc) {
    setComponentFunc(type, com)
  } else {
    console.warn('LayoutRoot is uninitialized')
  }
}

LayoutRoot.removeComponent = (type) => {
  LayoutRoot.setComponent(type, undefined)
}

LayoutRoot.Type = Type

export default LayoutRoot
