import React, {
  ComponentType,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { TableInstance, TableXDataItem } from '../../base'
import { TableProps } from '../../table'
import HighlightTableXContext from './context'
import { HighlightTableXProps } from './types'
import SelectTableXContext from '../select_table_x/context'

function highlightTableXHOC<Props extends HighlightTableXProps = HighlightTableXProps>(
  Table: ComponentType<Props>
) {
  const HighlightTableX: React.FC<Props & TableProps> = ({
    keyField,
    data,
    onRowClick,
    syncWithSelect = true,
    onSelect,
    ...rest
  }) => {
    const { selected, isSelectAll } = useContext(SelectTableXContext)
    const tableRef = useRef<TableInstance>(null)
    // 当前高亮行
    const [highlight, setHighlight] = useState<number>()

    useImperativeHandle(rest.tableRef, () => tableRef.current!)

    const handleSetHighlight = (index: number) => {
      setHighlight(index)
    }

    const handleRowClick = (original: TableXDataItem, e: Event, index: number) => {
      if (onRowClick) {
        onRowClick(original, e, index)
      }
      handleSetHighlight(index)
    }
    // 和 select 联动
    const handleSelect = useCallback(
      (...args: Parameters<any>) => {
        const [, isSelected, index] = args
        if (onSelect) {
          // @ts-ignore
          onSelect(...args)
        }
        if (syncWithSelect && index !== undefined) {
          if (isSelected) {
            setHighlight(index as number)
          } else {
            setHighlight(undefined)
          }
        }
      },
      [onSelect, syncWithSelect]
    )

    // 按上下键切换高亮
    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (highlight === undefined) {
          return
        }
        const key = ['ArrowUp', 'ArrowDown', 'Enter']
        if (!key.includes(e.key)) {
          return
        }
        e.preventDefault()
        if (e.key === 'ArrowUp') {
          if (highlight === 0) {
            return
          }
          setHighlight(highlight - 1)
          // eslint-disable-next-line no-unused-expressions
          tableRef.current?.scrollToItem(highlight - 1)
        } else if (e.key === 'ArrowDown') {
          if (highlight === data.length - 1) {
            return
          }
          setHighlight(highlight + 1)
          // eslint-disable-next-line no-unused-expressions
          tableRef.current?.scrollToItem(highlight + 1)
        } else if (e.key === 'Enter') {
          if (highlight === undefined) {
            return
          }
          onRowClick && onRowClick(data[highlight], e, highlight)
        }
        // 如果选择的行超出了视口，则滚动到该行
      },
      [data.length, highlight]
    )

    useEffect(() => {
      document.addEventListener('keydown', handleKeyDown)
      return () => {
        document.removeEventListener('keydown', handleKeyDown)
      }
    }, [handleKeyDown])

    return (
      <HighlightTableXContext.Provider value={{ highlight, setHighlight }}>
        <Table
          {...(rest as Props)}
          onRowClick={handleRowClick}
          keyField={keyField}
          tableRef={tableRef}
          data={data}
          onSelect={handleSelect}
        />
      </HighlightTableXContext.Provider>
    )
  }
  return HighlightTableX
}

export default highlightTableXHOC
