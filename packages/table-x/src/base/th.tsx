import React, { FC, ThHTMLAttributes, useContext, useMemo } from 'react'
import { Resizable } from 'react-resizable'
import classNames from 'classnames'
import { TableXThProps } from './types'
import { getColumnStyle } from '../utils'
import { TableComponents } from '../table'
import { TableReSize, TableResizeProps } from '../table/base_table'
import { LocalStorage } from '@gm-common/tool'
import { isUndefined } from 'lodash'

const clearSelection = () => {
  const _document = document as any
  if (window.getSelection) {
    const selection = window.getSelection()
    if (selection) {
      if (selection.empty) {
        // Chrome
        selection.empty()
      } else if (selection.removeAllRanges) {
        // Firefox
        selection.removeAllRanges()
      }
    }
  } else if (_document?.selection && _document?.selection.empty) {
    // IE
    ;(_document.selection as any).empty()
  }
}
interface ThProps extends TableXThProps {
  sortDirection?: 'desc' | 'asc' | null
  components?: TableComponents
  index: number
  isResizable?: boolean
  id?: string
  totalLeft?: number
}

const Th: FC<ThProps> = ({ isResizable, column, index, totalWidth, id, totalLeft }) => {
  const tableResize = useContext(TableReSize) as TableResizeProps
  const hp = column.getHeaderProps()

  const handleResize = (_: Event, resizeRes: any) => {
    const width =
      +resizeRes.size.width < 100
        ? 100
        : +resizeRes.size.width > 1000
        ? 1000
        : +resizeRes.size.width
    // console.log(width, 'width')
    const widthList = {
      ...tableResize?.widthList,
      [column.id]: width + 'px',
    }

    if (!isUndefined(id)) {
      LocalStorage.set(id, widthList)
    }
    tableResize.setWidthList(widthList)
  }
  const thProps: ThHTMLAttributes<HTMLTableHeaderCellElement> = useMemo(() => {
    return {
      ...hp,
      className: classNames(
        'gm-table-x-th',
        `gm-table-x-column-${column.index}`,
        hp.className,
        {
          'gm-table-x-fixed-left': column.fixed === 'left',
          'gm-table-x-fixed-right': column.fixed === 'right',
        }
      ),
      style: {
        ...hp.style,
        ...getColumnStyle(column),
        width: tableResize?.widthList[column.id] || getColumnStyle(column).width,
        maxWidth: tableResize?.widthList[column.id] || getColumnStyle(column).maxWidth,
      },
    }
  }, [hp, column, tableResize])

  if (column.fixed === 'left') {
    thProps.style = {
      ...thProps.style,
      left: totalLeft,
    }
  } else if (column.fixed === 'right') {
    thProps.style = {
      ...thProps.style,
      right: totalWidth - column.totalLeft - column.totalWidth,
    }
  }

  const isFixed = column.fixed && ['left', 'right'].includes(column.fixed)
  const canResize = isFixed && column.isFixedCanResize

  if ((isResizable && !isFixed) || (canResize && isResizable)) {
    return (
      <Resizable
        width={parseInt(
          tableResize?.widthList[column.id] || getColumnStyle(column).width!,
          10
        )}
        height={0}
        onResize={handleResize}
        draggableOpts={{
          enableUserSelectHack: false,
          onMouseDown: () => {
            // 处理Windows Chrome 和 Edge 松开鼠标依然能拖动的问题
            clearSelection()
          },
        }}
      >
        <th {...thProps}>
          <div
            className='gm-table-x-header-wrap'
            style={{
              lineClamp: 1,
              position: 'relative',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              display: 'flex',
            }}
          >
            {column.render('Header')}
          </div>
        </th>
      </Resizable>
    )
  }
  return <th {...thProps}>{column.render('Header')}</th>
}

export default React.memo(Th)
