import React, { FC, useEffect } from 'react'
import _ from 'lodash'
import { TipProps, TipStatic } from './types'
import { Flex } from '../flex'
import { LayoutRoot } from '../layout_root'
import SVGSuccess from '../../svg/success-circle.svg'
import SVGDanger from '../../svg/close-circle.svg'
import SVGRemove from '../../svg/remove.svg'

const Tip: FC<TipProps> & TipStatic = ({
  type,
  time = 3000,
  onClose = _.noop,
  children,
}) => {
  useEffect(() => {
    let timer: any
    if (time) {
      timer = setTimeout(() => {
        onClose()
      }, time)
    }

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [])

  return (
    <Flex justifyCenter className='gm-tip-warp'>
      <Flex className={`gm-tip gm-tip-${type} level`}>
        <Flex flex alignCenter>
          <span className='gm-tip-icon'>
            {type === 'success' && <SVGSuccess />}
            {type === 'danger' && <SVGDanger />}
          </span>
          <span className='gm-tip-text'>{children}</span>
        </Flex>
        {!time && (
          <span
            className='gm-tip-close gm-margin-left-5 gm-margin-top-5 gm-cursor'
            onClick={() => {
              onClose()
            }}
          >
            <SVGRemove />
          </span>
        )}
      </Flex>
    </Flex>
  )
}

Tip.tip = (options, type) => {
  if (typeof options === 'string') {
    options = {
      children: options,
    }
  }
  options.type = type

  const id = +new Date() + '' + Math.random()

  const _onClose = options.onClose
  options.onClose = () => {
    LayoutRoot.removeComponentArray(LayoutRoot.Type.TIP, id)
    if (_onClose) {
      _onClose()
    }
  }

  LayoutRoot.setComponentArray(LayoutRoot.Type.TIP, id, <Tip {...options} />)

  return id
}

Tip.success = (options) => {
  return Tip.tip(options, 'success')
}

Tip.danger = (options) => {
  return Tip.tip(options, 'danger')
}

Tip.clear = (id) => {
  LayoutRoot.removeComponentArray(LayoutRoot.Type.TIP, id)
}

Tip.clearAll = () => {
  LayoutRoot.clearComponentArray(LayoutRoot.Type.TIP)
}

export default Tip
