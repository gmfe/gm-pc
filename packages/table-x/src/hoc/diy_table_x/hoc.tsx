import React, { ComponentType, FC, useMemo, useRef, useState } from 'react'
import { Popover, Storage } from '@gm-pc/react'
import { getLocale } from '@gm-pc/locales'
import { DiyTableXColumn, DiyTableXProps } from './types'
import { TableXColumn, TableXProps } from '../../base'
import { generateDiyColumns, getStorageColumns } from './utils'
import SVGSetting from '../../svg/setting.svg'
import { TABLE_X, TABLE_X_DIY_ID } from '../../utils'
import DiyTableXModal from './components/modal'
import { OperationIconTip } from '../../components/operation'

function diyTableXHOC<Props extends TableXProps = TableXProps>(
  Table: ComponentType<Props>
) {
  const DiyTableX: FC<Props & DiyTableXProps> = ({ id, columns, ...rest }) => {
    const diyModalRef = useRef<Popover>(null)
    const [diyCols, setDiyCols] = useState(
      () => generateDiyColumns(columns, (Storage.get(id) ?? []) as DiyTableXColumn[])[1]
    )

    const handleDiyColumnsSave = (columns: DiyTableXColumn[]): void => {
      setDiyCols(columns)
      Storage.set(id, getStorageColumns(columns))
    }

    const handleCancel = (): void => {
      diyModalRef.current!.apiDoSetActive()
    }

    const newColumns: TableXColumn[] = useMemo(() => {
      const [notDiyCols, cols] = generateDiyColumns(columns, diyCols)
      return [
        {
          id: TABLE_X_DIY_ID,
          width: TABLE_X.WIDTH_FUN,
          maxWidth: TABLE_X.WIDTH_FUN,
          accessor: TABLE_X_DIY_ID,
          fixed: 'left',
          Cell: () => null,
          Header: () => (
            <Popover
              ref={diyModalRef}
              showArrow
              offset={-10}
              popup={
                <DiyTableXModal
                  columns={cols}
                  onSave={handleDiyColumnsSave}
                  onCancel={handleCancel}
                />
              }
            >
              <div className='gm-table-x-icon'>
                <OperationIconTip tip={getLocale('表头设置')}>
                  <div>
                    <SVGSetting className='gm-cursor gm-text-hover-primary' />
                  </div>
                </OperationIconTip>
              </div>
            </Popover>
          ),
        },
        ...notDiyCols,
        ...cols,
      ]
    }, [columns, diyCols])

    return <Table {...(rest as Props)} id={id} columns={newColumns} />
  }

  return DiyTableX
}

export default diyTableXHOC
