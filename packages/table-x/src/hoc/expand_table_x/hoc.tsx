import React, { ComponentType, FC, useMemo, useState } from 'react'
import _ from 'lodash'
import { TableXColumn, TableXProps } from '../../base'
import ExpandTableXContext from './context'
import { ExpandTableXProps } from './types'
import { TABLE_X, TABLE_X_EXPAND_ID } from '../../utils'
import ExpandHeader from './header'
import ExpandCell from './cell'
import { TableXRow } from '../../base/types'

function getNewColumns(
  columns: TableXColumn[],
  fixedExpand: boolean,
  isExpandCellHidden: any
): TableXColumn[] {
  return [
    {
      id: TABLE_X_EXPAND_ID,
      width: TABLE_X.WIDTH_FUN,
      maxWidth: TABLE_X.WIDTH_FUN,
      fixed: fixedExpand ? 'left' : undefined,
      Header: () => <ExpandHeader />,
      Cell: (cellProps) => {
        if (isExpandCellHidden) {
          if (isExpandCellHidden(cellProps) === false) {
            return null
          }
        }

        return <ExpandCell row={cellProps.row} />
      },
    },
    ...columns,
  ]
}

function expandTableXHOC<Props extends TableXProps = TableXProps>(
  Table: ComponentType<Props>
) {
  const ExpandTableX: FC<Props & ExpandTableXProps> = (props) => {
    const isControlByProps = 'expanded' in props

    const {
      columns,
      data,
      SubComponent,
      fixedExpand,
      expanded: expandedFromProps,
      onExpand,
      isExpandCellHidden,
      ...rest
    } = props

    const [expanded, setExpanded] = isControlByProps
      ? [expandedFromProps!, onExpand!]
      : // eslint-disable-next-line react-hooks/rules-of-hooks
        useState<{ [key: number]: boolean }>({})
    const isExpandAll = _.filter(expanded, (v) => v).length === data.length

    const handleExpand = (expanded: { [key: number]: boolean }): void => {
      setExpanded(expanded)
    }

    const handleExpandAll = (): void => {
      if (isExpandAll) {
        setExpanded({})
      } else {
        const newExpanded: { [key: number]: boolean } = {}
        data.forEach((_, index) => {
          newExpanded[index] = true
        })
        setExpanded(newExpanded)
      }
    }

    const renderSubComponent = (row: TableXRow) => {
      const isExpanded = expanded[row.index]
      if (!isExpanded) {
        return null
      }
      return SubComponent ? SubComponent(row) : null
    }

    const newColumns = useMemo(() => {
      return getNewColumns(columns, !!fixedExpand, isExpandCellHidden)
    }, [columns, fixedExpand, isExpandCellHidden])

    return (
      <ExpandTableXContext.Provider
        value={{
          expanded,
          isExpandAll,
          onExpand: handleExpand,
          onExpandAll: handleExpandAll,
        }}
      >
        <Table
          {...(rest as Props)}
          data={data}
          columns={newColumns}
          SubComponent={renderSubComponent}
        />
      </ExpandTableXContext.Provider>
    )
  }

  return ExpandTableX
}

export default expandTableXHOC
