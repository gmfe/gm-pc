import React, { useState } from 'react'
import { Button, Flex } from '@gm-pc/react'
import { getLocale } from '@gm-pc/locales'
import { DiyTableXColumn } from '../types'
import Selector from './selector'
import List from './list'
import SVGRemove from '../../../svg/remove.svg'
import { getSortedColumns, getStorageColumns } from '../utils'

interface DiyTableXModalProps {
  columns: DiyTableXColumn[]
  onSave(columns: DiyTableXColumn[]): void
  onCancel(): void
  /** 表头设置中启用选定字段排序 */
  customSequence?: boolean
}

function DiyTableXModal({
  columns,
  onSave,
  customSequence,
  onCancel,
}: DiyTableXModalProps) {
  const [diyCols, setDiyCols] = useState(columns)
  const [showCols, setShowCols] = useState(columns.filter((v) => v.show))

  const handleSave = (): void => {
    let columns = diyCols.map((col) => {
      const show = showCols.find((v) => v.key === col.key)
      return {
        ...col,
        show: !!show,
        sequence: show?.sequence,
      } as DiyTableXColumn
    })
    // 再考虑固定列来更新sequence
    columns = getSortedColumns(columns)
    columns = columns.map((column, index) => Object.assign(column, { sequence: index }))
    onSave(columns)
    onCancel()
  }

  const handleColumnsChange = (key: string, show: boolean): void => {
    const index = diyCols.findIndex((o) => o.key === key)
    const currentItem = diyCols[index]
    currentItem.show = show
    setDiyCols(diyCols)
    if (currentItem.show) {
      setShowCols(diyCols.filter((v) => v.show))
    } else {
      const _showCols = showCols.filter((value) => value.key !== key)
      setShowCols(_showCols)
    }
  }

  const handleColumnsRemove = (key: string): void => {
    handleColumnsChange(key, false)
  }

  return (
    <div className='gm-react-table-x-diy-modal'>
      <Flex
        className='gm-react-table-x-diy-modal-header gm-padding-tb-5'
        justifyBetween
        alignCenter
      >
        <div className='gm-react-table-x-diy-modal-header-title gm-margin-left-10 gm-padding-left-5'>
          {getLocale('表头设置')}
        </div>
        <div
          className='gm-react-table-x-diy-modal-header-close gm-cursor'
          onClick={onCancel}
        >
          <SVGRemove />
        </div>
      </Flex>
      <Flex className='gm-react-table-x-diy-modal-content'>
        <div className='gm-react-table-x-diy-modal-selector'>
          <div className='gm-react-table-x-diy-modal-title'>{getLocale('可选字段')}</div>
          <Selector columns={diyCols} onColumnsChange={handleColumnsChange} />
        </div>
        <div className='gm-react-table-x-diy-modal-list'>
          <div className='gm-react-table-x-diy-modal-title'>
            {getLocale('当前选定字段')}
          </div>
          <List
            columns={showCols}
            onColumnsRemove={handleColumnsRemove}
            onSort={(cols) => setShowCols(cols)}
            sortable={customSequence}
          />
        </div>
      </Flex>
      <Flex justifyEnd className='gm-padding-10'>
        <Button onClick={onCancel}>{getLocale('取消')}</Button>
        <div className='gm-gap-10' />
        <Button type='primary' className='gm-margin-right-10' onClick={handleSave}>
          {getLocale('保存')}
        </Button>
      </Flex>
    </div>
  )
}

export default DiyTableXModal
