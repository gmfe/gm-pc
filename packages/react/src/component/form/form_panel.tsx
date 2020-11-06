import React, { FC, useCallback, useState, MouseEvent } from 'react'
import { Flex } from '../flex'
import { getLocale } from '@gm-pc/locales'
import { IconDownUp } from '../icon_down_up'
import { FormPanelProps } from './types'

const FormPanelMore: FC = ({ children }) => {
  const [open, setOpen] = useState(false)

  const handleToggle = useCallback(
    (event: MouseEvent) => {
      event.preventDefault()
      setOpen(!open)
    },
    [open]
  )

  return (
    <>
      <div style={{ marginTop: '-10px', paddingBottom: open ? '10px' : '20px' }}>
        <div
          className='gm-text-primary gm-cursor gm-padding-right-0'
          onClick={handleToggle}
        >
          {open ? getLocale('收起') : getLocale('展开')}
          {getLocale('更多设置')}
          <IconDownUp active={open} />
        </div>
      </div>
      {open && children}
    </>
  )
}

const FormPanel: FC<FormPanelProps> = ({
  title,
  left,
  right,
  children,
  showBorder = true,
  ...rest
}) => {
  return (
    <div {...rest} className='gm-form-panel'>
      <Flex flex justifyBetween alignEnd className='gm-form-panel-header'>
        <Flex>
          <div className='gm-form-panel-header-tag' />
          <div className='gm-form-panel-header-title'>{title}</div>
        </Flex>
        <Flex column none>
          {left}
        </Flex>
        <Flex flex />
        <Flex column none>
          {right}
        </Flex>
      </Flex>
      {showBorder && <div className='gm-form-panel-border' />}
      <div className='gm-form-panel-content'>{children}</div>
    </div>
  )
}

export { FormPanelMore }
export default FormPanel
