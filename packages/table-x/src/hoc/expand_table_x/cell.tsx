import React from 'react'
import { Row } from 'react-table'
import ExpandTableXContext from './context'
import ExpandItem from './item'

function ExpandCell({ row }: { row: Row }) {
  return (
    <ExpandTableXContext.Consumer>
      {({ expanded, onExpand }) => {
        const isExpanded = expanded[row.index]
        return (
          <ExpandItem
            active={isExpanded}
            onChange={() => {
              onExpand({ ...expanded, [row.index]: !isExpanded })
            }}
          />
        )
      }}
    </ExpandTableXContext.Consumer>
  )
}

export default React.memo(ExpandCell)
