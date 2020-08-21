import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  Popover,
  PopupContentConfirm,
  Flex,
  InputNumberV2,
  Button,
  Input
} from '@gm-pc/react'
import _ from 'lodash'
import { getLocale } from '@gm-pc/locales'
import SVGMinusSquare from '../svg/minus-square.svg'
import SVGPlusSquare from '../svg/plus-square.svg'
import SVGDelete from '../svg/delete.svg'
import SVGPen from '../svg/pen.svg'
import SVGCheckDetail from '../svg/check-detail.svg'
import SVGEditPen from '../svg/edit-pen.svg'
import OperationIconTip from './operation_icon_tip'

const OperationHeader = <div className='text-center'>操作</div>

const OperationCell = function(props) {
  return (
    <div {...props} className={classNames('text-center', props.className)} />
  )
}

OperationCell.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object
}

const OperationDetail = ({ href, open, onClick, className, ...rest }) => {
  const handleClick = e => {
    onClick && onClick(e)

    if (href) {
      if (open) {
        window.open(href)
      } else {
        window.location.href = href
      }
    }
  }

  return (
    <div
      {...rest}
      onClick={handleClick}
      className={classNames(
        'gm-inline-block gm-cursor gm-padding-5 gm-text-14 gm-text gm-text-hover-primary',
        className
      )}
    >
      <OperationIconTip tip={getLocale('详情')}>
        <div>
          <SVGCheckDetail />
        </div>
      </OperationIconTip>
    </div>
  )
}

OperationDetail.propTypes = {
  /** 如果提供了 href */
  href: PropTypes.string,
  /** true就新开tab页面 */
  open: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object
}

const OperationDelete = props => {
  const { title, onClick, className, children, ...rest } = props
  const refPopover = useRef()

  const handleDelete = () => {
    refPopover.current.apiDoSetActive(false)
    return onClick()
  }

  const handleCancel = () => {
    refPopover.current.apiDoSetActive(false)
  }

  const popup = (
    <PopupContentConfirm
      type='delete'
      title={title}
      onDelete={handleDelete}
      onCancel={handleCancel}
    >
      {children || '确定删除？'}
    </PopupContentConfirm>
  )

  return (
    <Popover ref={refPopover} right popup={popup} showArrow>
      <div
        {...rest}
        className={classNames(
          'gm-inline-block gm-cursor gm-padding-5 gm-text-14 gm-text gm-text-hover-primary',
          className
        )}
      >
        <OperationIconTip tip={getLocale('删除')}>
          <div>
            <SVGDelete />
          </div>
        </OperationIconTip>
      </div>
    </Popover>
  )
}

OperationDelete.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  style: PropTypes.object
}

class SortHeader extends React.Component {
  render() {
    const { className, type, ...rest } = this.props

    return (
      <span
        {...rest}
        className={classNames(
          'gm-react-table-sort-header gm-cursor',
          {
            'gm-react-table-sort-header-asc': type === 'asc',
            'gm-react-table-sort-header-desc': type === 'desc'
          },
          className
        )}
      />
    )
  }
}

SortHeader.propTypes = {
  type: PropTypes.oneOf(['asc', 'desc']),
  className: PropTypes.string
}

const EditTableOperation = props => {
  return (
    <OperationCell>
      <Popover
        showArrow
        type='hover'
        popup={<div className='gm-padding-5'>添加</div>}
        disabled={!props.onAddRow}
      >
        <span
          onClick={props.onAddRow}
          className={classNames('gm-react-edit-table-action-add', {
            disabled: !props.onAddRow
          })}
        >
          <SVGPlusSquare />
        </span>
      </Popover>
      <Popover
        showArrow
        type='hover'
        popup={<div className='gm-padding-5'>删除</div>}
        disabled={!props.onDeleteRow}
      >
        <span
          onClick={props.onDeleteRow}
          className={classNames('gm-react-edit-table-action-delete', {
            disabled: !props.onDeleteRow
          })}
        >
          <SVGMinusSquare />
        </span>
      </Popover>
    </OperationCell>
  )
}

EditTableOperation.propTypes = {
  onAddRow: PropTypes.func,
  onDeleteRow: PropTypes.func
}

const OperationRowEdit = ({
  children,
  isEditing,
  onClick,
  onSave,
  onCancel
}) => {
  const handleClick = () => {
    onClick && onClick()
  }

  const handleSave = () => {
    onSave && onSave()
  }

  const handleCancel = () => {
    onCancel && onCancel()
  }

  return !isEditing ? (
    <OperationCell>
      <OperationIconTip tip={getLocale('编辑')}>
        <span className='gm-padding-5'>
          <SVGPen
            className='gm-inline-block gm-cursor gm-text-14 gm-text gm-text-hover-primary'
            onClick={handleClick}
          />
        </span>
      </OperationIconTip>
      {children}
    </OperationCell>
  ) : (
    <OperationCell>
      <Button type='link' onClick={handleSave}>
        保存
      </Button>
      <span className='gm-padding-lr-5'>|</span>
      <Button type='link' onClick={handleCancel}>
        取消
      </Button>
    </OperationCell>
  )
}

OperationRowEdit.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  onSave: PropTypes.func,
  onCancel: PropTypes.func
}

function getColumnKey(column) {
  // 如果是字符串就取 accessor
  if (_.isString(column.accessor)) {
    return column.accessor
  }
  // 如果 accessor 是函数，则一定会提供 id，否则 react-table 会报错
  else if (_.isFunction(column.accessor) && column.id) {
    return column.id
  }
  // 额外的情况，有些时候只有id，比如 diy 存储就只存了 id，因为 函数没法存储
  else if (column.id) {
    return column.id
  }

  // 其他情况没法获得 key
  return null
}

const EditButton = ({ popupRender, right }) => {
  const refPopover = useRef(null)
  const closePopup = () => refPopover.current.apiDoSetActive(false)

  return (
    <Popover
      ref={refPopover}
      popup={popupRender(closePopup)}
      right={right}
      offset={right ? 24 : -24}
      showArrow
      arrowLeft={right ? 'calc(100% - 42px)' : 26}
      animName={false}
    >
      <span style={{ display: 'inline-block', width: '20px' }}>
        <OperationIconTip tip={getLocale('编辑')}>
          <span>
            <SVGEditPen className='react-table-edit-button gm-cursor gm-text-14 gm-text-hover-primary' />
          </span>
        </OperationIconTip>
      </span>
    </Popover>
  )
}

EditButton.propTypes = {
  popupRender: PropTypes.func.isRequired,
  right: PropTypes.bool
}

const EditContentInput = ({
  closePopup,
  initialVal,
  onSave,
  suffixText,
  ...rest
}) => {
  const [val, setVal] = useState(initialVal)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current && inputRef.current.focus()
  }, [])

  const handleSave = () => {
    onSave(val)
    closePopup()
  }

  const handleInputFocus = e => {
    e.target && e.target.select()
  }

  const handleInputKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault()

      onSave(val)
      closePopup()
    }
  }

  return (
    <Flex alignCenter className='gm-padding-tb-10 gm-padding-lr-10'>
      <Flex alignCenter>
        <Input
          {...rest}
          ref={inputRef}
          className='form-control'
          style={{ width: '150px' }}
          value={val}
          onFocus={handleInputFocus}
          onKeyDown={handleInputKeyDown}
          onChange={e => setVal(e.target.value)}
        />
        {suffixText && <div className='gm-margin-left-5'>{suffixText}</div>}
      </Flex>
      <Button type='primary' onClick={handleSave} className='gm-margin-left-10'>
        {getLocale('保存')}
      </Button>
    </Flex>
  )
}

EditContentInput.propTypes = {
  closePopup: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  suffixText: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  initialVal: PropTypes.string
}

EditContentInput.defaultProps = {
  initialVal: ''
}

const EditContentInputNumber = ({
  closePopup,
  initialVal,
  onSave,
  suffixText,
  ...rest
}) => {
  const [val, setVal] = useState(initialVal)
  const inputNumberRef = useRef(null)

  useEffect(() => {
    inputNumberRef.current && inputNumberRef.current.apiDoFocus()
  }, [])

  const handleSave = () => {
    onSave(val)
    closePopup()
  }

  const handleInputFocus = e => {
    e.target && e.target.select()
  }

  const handleInputKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault()

      onSave(val)
      closePopup()
    }
  }

  const handleChange = value => {
    setVal(value)
  }

  return (
    <Flex alignCenter className='gm-padding-tb-10 gm-padding-lr-10'>
      <Flex alignCenter>
        <InputNumberV2
          {...rest}
          ref={inputNumberRef}
          style={{ width: '150px' }}
          value={val}
          className='form-control'
          onFocus={handleInputFocus}
          onKeyDown={handleInputKeyDown}
          onChange={handleChange}
        />
        {suffixText && <div className='gm-margin-left-5'>{suffixText}</div>}
      </Flex>
      <Button type='primary' className='gm-margin-left-10' onClick={handleSave}>
        {getLocale('保存')}
      </Button>
    </Flex>
  )
}

EditContentInputNumber.propTypes = {
  onSave: PropTypes.func.isRequired,
  closePopup: PropTypes.func.isRequired,
  initialVal: PropTypes.number,
  suffixText: PropTypes.string
}

EditContentInputNumber.defaultProps = {
  initialVal: null
}

const referOfWidth = {
  noCell: 40,
  operationCell: 100,
  searchBox: 168,
  numberInputBox: 80,
  selectBox: 148,
  tableSelectBox: 148,
  levelSelectBox: 148,
  dateSelectBox: 110
}

export {
  getColumnKey,
  OperationHeader,
  OperationDelete,
  OperationDetail,
  OperationCell,
  OperationRowEdit,
  SortHeader,
  EditTableOperation,
  EditButton,
  EditContentInput,
  EditContentInputNumber,
  referOfWidth
}
