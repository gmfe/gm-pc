import React, { ComponentType, useEffect, useState } from 'react'
import { Resizable } from 'react-resizable'
import { Column, TableProps } from '../../table'

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

const ResizeableTitle = (props: Record<string, any>) => {
  const { onResize, ...restProps } = props

  // 宽度取style上的宽度
  const width = parseInt(restProps?.style.width)

  return (
    <Resizable
      width={width}
      height={0}
      onResize={onResize}
      draggableOpts={{
        enableUserSelectHack: false,
        onMouseDown: () => {
          // 处理Windows Chrome 和 Edge 松开鼠标依然能拖动的问题
          clearSelection()
        },
      }}
    >
      <th {...restProps} />
    </Resizable>
  )
}

function resizeableTableXHOC<Props extends TableProps = TableProps>(
  Table: ComponentType<Props>
) {
  const ResizeableTableX: React.FC<TableProps> = ({ ...rest }) => {
    const [newColumns, setNewColumns] = useState<Column<any>[]>([])

    const handleResize = (index: number) => (
      _: Event,
      { size }: { size: { width: number; height: number } }
    ) => {
      setNewColumns((columns) => {
        const nextColumns = [...columns]

        nextColumns[index] = {
          ...nextColumns[index],
          width: size.width,
        }
        return nextColumns
      })
    }

    useEffect(() => {
      const _columns = rest.columns.map((col, index) => ({
        ...col,
        onHeaderCell: () => ({
          onResize: handleResize(index),
        }),
      }))

      setNewColumns(_columns)
    }, [rest.columns])

    return (
      <Table
        {...(rest as Props)}
        columns={newColumns}
        components={{
          header: {
            cell: ResizeableTitle,
          },
        }}
      />
    )
  }
  return ResizeableTableX
}

export default resizeableTableXHOC
