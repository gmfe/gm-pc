import React, {
  ChangeEvent,
  Component,
  createRef,
  CSSProperties,
  InputHTMLAttributes,
} from 'react'
import classNames from 'classnames'
import { checkValue, fixNumber, processPropsValue, text2Number } from './utils'
import { Input } from '../input'

interface InputNumberProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value: number | null
  onChange?(value: number | null): void
  disabled?: boolean
  placeholder?: string
  min?: number
  max?: number
  precision?: number
  className?: string
  style?: CSSProperties
}

interface InputNumberState {
  value: string
}

class InputNumber extends Component<InputNumberProps, InputNumberState> {
  static defaultProps = {
    value: null,
    precision: 2,
  }

  static getDerivedStateFromProps(
    props: InputNumberProps,
    state: InputNumberState
  ): InputNumberState | null {
    // 一旦不一致就应该改，要比较 number 形式
    if (props.value !== text2Number(state.value)) {
      return {
        value: processPropsValue(props.value as number),
      }
    }

    return null
  }

  private _inputRef = createRef<HTMLInputElement>()
  private _isUnmount = false

  readonly state: InputNumberState = {
    value: processPropsValue(this.props.value as number),
  }

  componentWillUnmount() {
    this._isUnmount = true
  }

  public apiDoFocus(): void {
    if (this._isUnmount) {
      return
    }
    this._inputRef.current!.focus()
  }

  public apiDoSelect(): void {
    if (this._isUnmount) {
      return
    }
    this._inputRef.current!.select()
  }

  private _handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { min, max, precision, onChange } = this.props
    const eValue = event.target.value

    // 检测是否合法输入
    if (!checkValue(eValue, precision!, min)) {
      return
    }

    const newValue = text2Number(eValue)
    const newFixValue = fixNumber(newValue, min, max)

    // 如果数据有被修正，则同步下修改的值到 state
    if (newFixValue !== newValue) {
      this.setState({
        value: processPropsValue(newFixValue),
      })
    } else {
      this.setState({
        value: eValue,
      })
    }
    onChange(newFixValue)
  }

  render() {
    const { value, onChange, max, min, precision, className, ...rest } = this.props
    return (
      <Input
        {...rest}
        ref={this._inputRef}
        value={this.state.value}
        type='text'
        className={classNames('gm-input-number', className)}
        onChange={this._handleChange}
      />
    )
  }
}

export default InputNumber
export type { InputNumberProps }
