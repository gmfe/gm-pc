import React, { MouseEvent } from 'react'
import { DiyTableXColumn } from '../types'
import SVGRemove from '../../../svg/remove.svg'

interface ListProps {
  columns: DiyTableXColumn[]
  onColumnsRemove(key: string): void
}

function List({ columns, onColumnsRemove, onColsSort }: ListProps) {
  const onRemove = (event: MouseEvent<SVGElement>, key: string): void => {
    event.stopPropagation()
    onColumnsRemove(key)
  }
  const handleDragEnter = (event: any, key: string) => {
    if(!event.target){
      return
    }
    event.target.style.borderBottom = '2px dashed #008dff';
    event.stopPropagation()
    event.preventDefault()
  }
  
  const handleDragLeave = (event: any, key: string) => {
    event.target.style.border = '';
    event.target.style.boxShadow = '';
    event.stopPropagation()
    event.preventDefault()
  }

  const handleDragStart = (event: any, key: string) => {
    event.dataTransfer.setData("key", key);
  }

  const handleDrop = (event: any, key: string) => {
    if(!event.target){
      return
    }
    const beforekey = event.dataTransfer.getData("key");
    const afterkey = event.target?.attributes?.dragkey?.value
    event.target && (event.target.style.border = '')
    event.target && (event.target.style.boxShadow = '')
    onColsSort(beforekey, afterkey)
    event.stopPropagation()
    event.preventDefault()
  }

  return (
    <ul className='gm-react-table-x-diy-modal-list-ul'>
      {columns.map((column) => {
        const { diyItemText, Header, key, diyEnable } = column
        const text = diyItemText ?? Header
        return (
          <li className='gm-react-table-x-diy-modal-list-li' key={key} dragkey={key} onDragEnter={(event) => handleDragEnter(event, key!)}
          onDragLeave={(event) => handleDragLeave(event, key!)}
          onDragOver={(event) => handleDragEnter(event, key!)}
          onDragStart={(event) => handleDragStart(event, key!)}
          onDrop={(event) => handleDrop(event, key!)}
          draggable="true">
            {text}
            {diyEnable && (
              <SVGRemove
                className='gm-cursor gm-react-table-x-diy-modal-list-li-remove'
                onClick={(event) => onRemove(event, key!)}
              />
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default List
