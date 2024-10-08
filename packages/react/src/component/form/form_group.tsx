import React, {
  BaseSyntheticEvent,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { devWarnForHook, warn } from '@gm-common/tool'
import { Button } from '../button'
import { getLocale } from '@gm-pc/locales'
import _ from 'lodash'
import { useMutationObserver } from '../../common/hooks'
import { FormGroupProps } from './types'
import classNames from 'classnames'

const options = {
  childList: true,
  attributes: true, // 观察属性变动
  subtree: true,
  characterData: false,
}

const FormGroup: FC<FormGroupProps> = ({
  disabled,
  onCancel,
  children,
  formRefs,
  onSubmit,
  saveText,
  actions,
  onSubmitValidated,
  className,
  absolute = false,
  ...rest
}) => {
  devWarnForHook(() => {
    let i = 0
    onSubmit && i++
    onSubmitValidated && i++
    if (i === 0) {
      warn('请提供 onSubmit 或 onSubmitValidated')
    } else if (i > 1) {
      warn('请仅提供 onSubmit 或 onSubmitValidated')
    }
  })

  const [affix, setAffix] = useState(false)
  const bodyRef = useRef(document.querySelector('body'))

  const checkAndChangeAffix = useCallback(() => {
    const BODY_SCROLL_HEIGHT = document.body.scrollHeight
    const WINDOW_INNER_HEIGHT = window.innerHeight

    // 判断是否有滚动条就好
    if (BODY_SCROLL_HEIGHT > WINDOW_INNER_HEIGHT) {
      setAffix(true)
    } else {
      setAffix(false)
    }
  }, [])

  // 只针对body的scrollHeight
  const _observerCallBack = useCallback(_.throttle(checkAndChangeAffix, 1000), [
    checkAndChangeAffix,
  ])

  // 暂时没有其他方案可以监听body---scrollHeight,先通过body中的child变化来触发，内部没很重的逻辑
  useMutationObserver(bodyRef, _observerCallBack, options)

  useEffect(() => {
    const debounceChange = _.debounce(checkAndChangeAffix, 200)
    window.addEventListener('resize', debounceChange)

    return () => window.removeEventListener('resize', debounceChange)
  }, [checkAndChangeAffix])

  useEffect(() => {
    checkAndChangeAffix()
  }, [checkAndChangeAffix])

  const handleSubmit = useCallback(
    (event: BaseSyntheticEvent) => {
      event.preventDefault()
      if (onSubmit) {
        return onSubmit()
      }
      let isPass = true
      formRefs.forEach((form) => {
        if (!form.current!.apiDoValidate()) {
          isPass = false
        }
      })
      if (isPass && onSubmitValidated) {
        return onSubmitValidated()
      }
    },
    [onSubmit, formRefs, onSubmitValidated]
  )

  return (
    <>
      <div
        {...rest}
        onSubmit={handleSubmit}
        className={classNames('gm-margin-bottom-40', className)}
      >
        {children}
      </div>
      <div
        className={classNames(
          'gm-padding-tb-5 gm-margin-top-20 gm-text-center gm-form-group-position-fixed-box gm-form-group-sticky-box',
          { 'gm-form-group-position-absolute-box': absolute }
        )}
        // 统一padding,margin样式，保证affix切换时正常切换
      >
        <Action
          disabled={disabled}
          actions={actions}
          onSubmit={handleSubmit}
          saveText={saveText}
          onCancel={onCancel}
        />
      </div>
    </>
  )
}

export default FormGroup

type ActionProps = Omit<FormGroupProps, 'formRefs' | 'onSubmitValidated' | 'onSubmit'> & {
  onSubmit?(event: BaseSyntheticEvent): Promise<void> | void
}

const Action: FC<ActionProps> = ({ onCancel, onSubmit, disabled, saveText, actions }) => {
  const [loading, setLoading] = useState(false)

  const handleClick = (e: BaseSyntheticEvent) => {
    setLoading(true)
    Promise.resolve(onSubmit?.(e)).finally(() => setLoading(false))
  }

  return (
    <>
      {onCancel && (
        <>
          <Button onClick={onCancel}>{getLocale('取消')}</Button>
          <div className='gm-gap-10' />
        </>
      )}
      <Button type='primary' disabled={disabled} loading={loading} onClick={handleClick}>
        {saveText || getLocale('确定')}
      </Button>
      {actions}
    </>
  )
}
