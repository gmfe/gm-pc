import React, {
  FC,
  ThHTMLAttributes,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Resizable } from 'react-resizable'
import classNames from 'classnames'
import { TableXThProps } from './types'
import { getColumnStyle } from '../utils'
import { TableComponents } from '../table'
import { TableReSize, TableResizeProps } from '../table/base_table'
import { Flex } from '@gm-pc/react'
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
}

const Th: FC<ThProps> = ({ isResizable, column, index, totalWidth, id }) => {
  const tableResize = useContext(TableReSize) as TableResizeProps
  const hp = column.getHeaderProps()
  const handleResize = (_: Event, resizeRes: any) => {
    const width =
      +resizeRes.size.width < 100
        ? 100
        : +resizeRes.size.width > 1000
        ? 1000
        : +resizeRes.size.width
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

  useEffect(() => {
    if (!isUndefined(id)) {
      const widthList = LocalStorage.get(id)
      if (widthList) {
        tableResize.setWidthList(widthList)
      }
    }
  }, [])

  if (column.fixed === 'left') {
    thProps.style = {
      ...thProps.style,
      left: column.totalLeft,
    }
  } else if (column.fixed === 'right') {
    thProps.style = {
      ...thProps.style,
      right: totalWidth - column.totalLeft - column.totalWidth,
    }
  }

  const isFixed =
    typeof thProps.style?.left === 'number' || typeof thProps.style?.right === 'number'

  if (isResizable && !isFixed) {
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
          <Flex
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {column.render('Header')}
          </Flex>
        </th>
      </Resizable>
    )
  }
  return <th {...thProps}>{column.render('Header')}</th>
}

export default React.memo(Th)
