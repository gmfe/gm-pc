import React, {
  cloneElement,
  FC,
  MouseEvent,
  ReactElement,
  ReactNode,
  useRef,
} from 'react'
import { Tooltip, Popover } from '@gm-pc/react'

interface OperationIconTipProps {
  tip: ReactNode
}

const OperationIconTip: FC<OperationIconTipProps> = ({ tip, children }) => {
  const tipRef = useRef<Popover>(null)

  const handleClick = (fc: (event: MouseEvent) => void, event: MouseEvent): void => {
    tipRef.current!.apiDoSetActive()
    fc && fc(event)
  }

  return (
    <Tooltip popup={<div className='gm-padding-5'>{tip}</div>} showArrow ref={tipRef}>
      {cloneElement(children as ReactElement, {
        onClick: handleClick.bind(null, (children as ReactElement).props.onClick),
      })}
    </Tooltip>
  )
}

export default OperationIconTip
