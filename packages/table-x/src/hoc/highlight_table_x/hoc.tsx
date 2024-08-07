import React, {
  ComponentType,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { TableInstance, TableXDataItem } from '../../base'
import { TableProps } from '../../table'
import HighlightTableXContext from './context'

function highlightTableXHOC<Props extends TableProps = TableProps>(
  Table: ComponentType<Props>
) {
  const HighlightTableX: React.FC<Props> = ({ keyField, data, onRowClick, ...rest }) => {
    const tableRef = useRef<TableInstance>(null)
    // 当前高亮行
    const [highlight, setHighlight] = useState<number>()

    useImperativeHandle(rest.tableRef, () => tableRef.current)

    const handleSetHighlight = (index: number) => {
      setHighlight(index)
    }

    const handleRowClick = (original: TableXDataItem<any>, e: Event, index: number) => {
      if (onRowClick) {
        onRowClick(original, e, index)
      }
      handleSetHighlight(index)
    }

    // 按上下键切换高亮
    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        console.log(e.key)
        if (highlight === undefined) {
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
        />
      </HighlightTableXContext.Provider>
    )
  }
  return HighlightTableX
}

export default highlightTableXHOC
