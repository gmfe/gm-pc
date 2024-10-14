import React, { FC, ThHTMLAttributes, useContext, useEffect, useMemo, useState } from 'react'
import { Resizable } from 'react-resizable'
import classNames from 'classnames'
import { TableXThProps } from './types'
import { getColumnStyle } from '../utils'
import { TableComponents } from '../table'
import { TableReSize, TableResizeProps } from '../table/base_table'

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
  index:number
}

const Th: FC<ThProps> = ({ components, column,index, totalWidth }) => {
  const tableResize = useContext(TableReSize) as TableResizeProps
  const hp = column.getHeaderProps()
  const handleResize = (e:Event,resizeRes:any) => {
    tableResize.setWidthList({
      ...tableResize?.widthList,
      [index]:resizeRes.size.width+'px'
    })
  }
  const thProps: ThHTMLAttributes<HTMLTableHeaderCellElement> = useMemo(()=>{
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
        width: tableResize?.widthList[index] || getColumnStyle(column).width,
        maxWidth: tableResize?.widthList[index] || getColumnStyle(column).maxWidth,
      }
    }
  },[tableResize?.widthList])
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
 
 return  <Resizable
          width={ parseInt(tableResize?.widthList[index] ||getColumnStyle(column).width,10) }
          height={0}
          onResize={handleResize}
          draggableOpts={{
            enableUserSelectHack: false,
            onMouseDown: () => {
              // 处理Windows Chrome 和 Edge 松开鼠标依然能拖动的问题
              clearSelection()
            },
}}>{ components?.header?.cell ? (
    <components.header.cell {...thProps} {...(column?.onHeaderCell?.(column) || {})}>
      {column.render('Header')}
    </components.header.cell>
  ) : (
    <th {...thProps}  >{column.render('Header')}</th>
  )}

  </Resizable>
}

export default React.memo(Th)
