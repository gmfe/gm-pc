import React from 'react'
import _ from 'lodash'
import { DiyTableXColumn } from '../types'
import { Checkbox, Flex } from '@gm-pc/react'

interface SelectorProps {
  columns: DiyTableXColumn[]
  onColumnsChange(key: string, show: boolean): void
}

function Selector({ columns, onColumnsChange }: SelectorProps) {
  const arr: string[] = ['']
  const map: { [key: string]: DiyTableXColumn[] } = {
    '': [],
  }

  _.each(columns, (column) => {
    if (column.diyGroupName) {
      if (!arr.includes(column.diyGroupName)) {
        arr.push(column.diyGroupName)
      }
      if (!map[column.diyGroupName]) {
        map[column.diyGroupName] = []
      }

      map[column.diyGroupName].push(column)
    } else {
      map[''].push(column)
    }
  })

  return (
    <div className='gm-react-table-x-diy-modal-selector-content'>
      {arr.map((groupName) => {
        const cols = map[groupName]
        return (
          <div key={groupName}>
            <div className='gm-margin-tb-5'>{groupName}</div>
            <Flex wrap>
              {cols.map((col) => {
                const { show, Header, diyItemText, diyEnable, key } = col
                const text = diyItemText ?? Header

                return (
                  <div
                    key={_.uniqueId(key)}
                    style={{ width: '33.3%', padding: '5px 0', paddingRight: 5 }}
                  >
                    <Checkbox
                      value={key}
                      disabled={!diyEnable} // 不能编辑的字段禁用掉
                      checked={show}
                      onChange={() => {
                        onColumnsChange(key!, !show)
                      }}
                    >
                      {text}
                    </Checkbox>
                  </div>
                )
              })}
            </Flex>
          </div>
        )
      })}
    </div>
  )
}

export default Selector
