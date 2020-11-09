import React, {
  FC,
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import _ from 'lodash'
import { Form, FormProps } from '../form'
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

type BoxFormProps = FormProps

const BoxForm: FC<BoxFormProps> = ({ btnPosition = 'left', children, ...rest }) => {
  const [hasMore, setHasMore] = useState(false)
  const [open, setOpen] = useState(false)

  const handleToggle = (): void => {
    setOpen(!open)
  }

  const handleHasMore = (): void => {
    setHasMore(true)
  }

  return (
    <div className='gm-box gm-box-form'>
      <Flex>
        <Flex flex column>
          <BoxFormContext.Provider value={{ open, onHasMore: handleHasMore }}>
            <Form {...rest} btnPosition={btnPosition} inline={!open}>
              {children}
            </Form>
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
