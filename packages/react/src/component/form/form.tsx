import React, {
  Component,
  FormEvent,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  ComponentType,
  Children,
} from 'react'
import classNames from 'classnames'
import FormContext from './context'
import Validator from '../../validator'
import { FormProps, FormItemProps } from './types'
const { Provider } = FormContext

interface FormState {
  canValidate: boolean
}
/**
 * 请使用ControledForm
 * @deprecated
 */
class Form extends Component<FormProps, FormState> {
  static defaultProps = {
    btnPosition: 'center',
    colWidth: '320px',
  }

  readonly state: FormState = {
    canValidate: false,
  }

  public apiDoValidate = (): boolean => {
    const error = this._validateAll()
    this.setState({ canValidate: error })
    return !error
  }

  private _getFormItemFields = (
    children: ReactElement,
    formItems: ReactElement<FormItemProps>[]
  ) => {
    Children.toArray(children).forEach((value: ReactNode) => {
      const child = value as ReactElement<PropsWithChildren<FormItemProps>, ComponentType>
      if (child.type && child.type.displayName === 'FormItem') {
        formItems.push(child)
      } else if (child.props && child.props.children) {
        this._getFormItemFields(child.props.children as ReactElement, formItems)
      }
    })
  }

  private _validateAll = (): boolean => {
    const { children } = this.props
    const helpList: { label: ReactNode; help: string }[] = []
    const formItems: ReactElement<FormItemProps>[] = []
    this._getFormItemFields(children as ReactElement, formItems)
    formItems.forEach((item) => {
      if (item.props.error) {
        helpList.push({
          label: item.props.label,
          help: item.props.help!,
        })
      } else if (item.props.validate) {
        let help = ''
        if (item.props.required) {
          help = item.props.validate(function (value: any) {
            return Validator.validate(Validator.TYPE.required, value)
          })
        } else {
          help = item.props.validate()
        }
        if (help) {
          helpList.push({
            label: item.props.label,
            help,
          })
        }
      }
    })
    return !!helpList.length
  }

  private _handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const { onSubmit, onSubmitValidated } = this.props
    onSubmit && onSubmit(event)

    const error = this._validateAll()
    if (!error) {
      onSubmitValidated && onSubmitValidated()
    }

    this.setState({
      canValidate: error,
    })
  }

  render() {
    const {
      inline,
      labelWidth,
      disabledCol,
      className,
      children,
      hasButtonInGroup,
      onSubmitValidated,
      btnPosition,
      colWidth,
      ...rest
    } = this.props
    const { canValidate } = this.state
    return (
      <Provider
        value={{ labelWidth, disabledCol, inline, btnPosition, colWidth, canValidate }}
      >
        <form
          {...rest}
          className={classNames('gm-form', { 'form-inline': inline }, className)}
          onSubmit={this._handleSubmit}
        >
          {children}
          {hasButtonInGroup && <button type='submit' style={{ display: 'none' }} />}
        </form>
      </Provider>
    )
  }
}

export default Form
