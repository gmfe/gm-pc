import React, { createRef } from 'react'
import { getLocale } from '@gm-pc/locales'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { Storage, Popover } from '@gm-pc/react'
import SVGSetting from '../../../svg/setting.svg'
import { getColumnKey, referOfWidth } from '../../util'
import Table from '../../table'
import { devWarn } from '@gm-common/tool'
import DiyTableModal from './diy_table_modal'
import OperationIconTip from '../../operation_icon_tip'

/**
 * 生成新的columns
 * @param initColumns 初始columns
 * @param mixColumns 需要混合的columns(优先取值)
 * @returns {Array}
 */
function generateDiyColumns(initColumns, mixColumns) {
  // 把checkbox, selector, expander 提出来,不参与diy
  const [notDiyCols, diyCols] = splitColumns(initColumns)

  const diyColumns = _.map(diyCols, column => {
    const key = getColumnKey(column)
    // 能获取 key 才可能使用 diy
    if (key === null) {
      return column
    }

    // 默认显示和打开 diyEnable
    const { show = true, diyEnable = true } = column
    const newColumn = {
      ...column,
      key, // 把key记录下来,作为这个列的唯一标识
      show,
      diyEnable
    }

    // localstorage中储存的列
    const localItem = _.find(mixColumns, v => v.key === key)
    // localstorage的值覆盖初始值
    if (localItem) {
      newColumn.show = localItem.show
      newColumn.diySortNumber = localItem.diySortNumber
    }
    return newColumn
  })

  return [notDiyCols, diyColumns]
}

function getStorageColumns(columns) {
  // 过滤多余数据，避免复杂数据出现JSON循环引用报错问题
  return _.map(columns, col => {
    const { key, show, diyEnable, diySortNumber } = col
    return { key, show, diyEnable, diySortNumber }
  })
}

function splitColumns(columns) {
  const notDiyCols = []
  const diyCols = []
  for (const item of columns) {
    if (['__selector', '__expander'].includes(item.id)) {
      notDiyCols.push(item)
    } else {
      diyCols.push(item)
    }
  }
  return [notDiyCols, diyCols]
}

function diyTableHOC(Component) {
  class DiyTable extends React.Component {
    popoverRef = createRef()
    constructor(props) {
      super(props)
      // 没有id强制报错
      devWarn(() => {
        if (props.id === undefined) throw Error('diy 必须要有id!')
      })

      // 从localStorage拿到columns
      const localColumns = Storage.get(props.id) || []

      const [notDiyCols, diyCols] = generateDiyColumns(
        props.columns,
        localColumns
      )

      this.notDiyCols = notDiyCols
      this.state = {
        columns: diyCols
      }

      // 检测,如果不符合,警告调用方
      devWarn(() => {
        _.each(props.columns, column => {
          const key = getColumnKey(column)
          if (key && !['__selector', '__expander'].includes(column.id)) {
            if (!_.isString(column.Header) && !column.diyItemText) {
              console.error('column need diyItemText', column)
            }
            if (!column.diyGroupName) {
              console.error('column need diyGroupName', column)
            }
          }
        })
      })
    }

    static getDerivedStateFromProps(props, state) {
      return {
        columns: generateDiyColumns(props.columns, state.columns)[1]
      }
    }

    handleColumnsSave = newColumns => {
      this.setState({ columns: newColumns })
      Storage.set(this.props.id, getStorageColumns(newColumns))
    }

    handleCancel = () => {
      this.popoverRef.current.apiDoSetActive(false)
    }

    render() {
      const { columns } = this.state

      return (
        <Component
          {...this.props}
          columns={[
            {
              Header: () => (
                <Popover
                  ref={this.popoverRef}
                  showArrow
                  offset={-10}
                  popup={
                    <DiyTableModal
                      diyGroupSorting={this.props.diyGroupSorting}
                      columns={this.state.columns}
                      onSave={this.handleColumnsSave}
                      onCancel={this.handleCancel}
                    />
                  }
                >
                  <div className='table-icon'>
                    <OperationIconTip tip={getLocale('表头设置')}>
                      <div>
                        <SVGSetting className='gm-cursor gm-text-hover-primary' />
                      </div>
                    </OperationIconTip>
                  </div>
                </Popover>
              ),
              className: 'icon-column',
              headerClassName: 'icon-column',
              width: referOfWidth.noCell,
              accessor: '_setting', // 不重要,随便写
              id: '__setting', // 不重要,随便写
              fixed: 'left', // 改为默认固定
              Cell: () => null // 只是用来占据空间
            },
            ...this.notDiyCols,
            ..._.sortBy(columns, 'diySortNumber')
          ]}
        />
      )
    }
  }

  DiyTable.propTypes = {
    id: PropTypes.string.isRequired,
    /** 分组排序 */
    diyGroupSorting: PropTypes.array.isRequired,
    ...Table.propTypes
  }

  return DiyTable
}

export default diyTableHOC
