import React, {
  FC,
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import _ from 'lodash'
import { ControlledForm, ControlledFormProps } from '../controlled_form'
import { Form } from '../form'

import { Flex } from '../flex'
import { IconDownUp } from '../icon_down_up'
import { getLocale } from '@gm-pc/locales'
import { ButtonText } from '../button'

interface BoxFormContext {
  open: boolean
  onHasMore: () => void
}

const BoxFormContext = createContext<BoxFormContext>({
  open: false,
  onHasMore: _.noop,
})

const BoxFormMore: FC = ({ children }) => {
  const { open, onHasMore } = useContext(BoxFormContext)

  useEffect(() => {
    onHasMore()
  }, [onHasMore])

  if (!open) {
    return null
  }

  return children as ReactElement
}

type BoxFormProps<T> = ControlledFormProps<T> & {
  isControl?: boolean
}

function BoxForm<K = any>(props: BoxFormProps<K>) {
  const { btnPosition = 'left', isControl, children, ...rest } = props
  const [hasMore, setHasMore] = useState(false)
  const [open, setOpen] = useState(false)

  const handleToggle = (): void => {
    setOpen(!open)
  }

  const handleHasMore = (): void => {
    setHasMore(true)
  }
  const TempForm = isControl ? ControlledForm : Form

  return (
    <div className='gm-box gm-box-form'>
      <Flex>
        <Flex flex column>
          <BoxFormContext.Provider value={{ open, onHasMore: handleHasMore }}>
            <TempForm {...rest} btnPosition={btnPosition} inline={!open}>
              {children}
            </TempForm>
          </BoxFormContext.Provider>
        </Flex>
        {hasMore && (
          <ButtonText type='primary' onClick={handleToggle}>
            {open && getLocale('收起')}
            {getLocale('高级筛选')} <IconDownUp active={open} />
          </ButtonText>
        )}
      </Flex>
    </div>
  )
}

export { BoxForm, BoxFormMore }
export default BoxForm
export type { BoxFormProps }
