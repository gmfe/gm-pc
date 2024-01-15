import React, { ComponentType, FC, useEffect, useMemo, useRef, useState } from 'react'
import { Storage, Modal } from '@gm-pc/react'
import { getLocale } from '@gm-pc/locales'
import { DiyTableXColumn, DiyTableXProps } from './types'
import { TableXColumn, TableXProps } from '../../base'
import { generateDiyColumns, getSortedColumns, getStorageColumns } from './utils'
import SVGSetting from '../../svg/setting.svg'
import { TABLE_X, TABLE_X_DIY_ID } from '../../utils'
import DiyTableXModal from './components/modal'
import { OperationIcon } from '../../components/operation'

/**
 * 请使用Table并配置isDiy
 * @deprecated
 */
function diyTableXHOC<Props extends TableXProps = TableXProps>(
  Table: ComponentType<Props>
) {
  const DiyTableX: FC<Props & DiyTableXProps> = ({
    id,
    columns,
    customSequence,
    diyModalClassName,
    handleAvailableHeaderOnSave,
    ...rest
  }) => {
    const [diyCols, setDiyCols] = useState(
      () => generateDiyColumns(columns, (Storage.get(id) ?? []) as DiyTableXColumn[])[1]
    )
    const prevColumnsLength = useRef(columns.length)
    const prevColumnsKeys = useRef(columns.map((column) => column.id))

    const handleDiyColumnsSave = (columns: DiyTableXColumn[]): void => {
      setDiyCols(columns)
      Storage.set(id, getStorageColumns(columns))
      if (handleAvailableHeaderOnSave) {
        handleAvailableHeaderOnSave(columns)
      }
    }

    const handleCancel = (): void => {
      Modal.hide()
    }

    const newColumns: TableXColumn[] = useMemo(() => {
      const [notDiyCols, cols] = generateDiyColumns(columns, diyCols)
      let diyColumns = cols
      if (customSequence) {
        diyColumns = getSortedColumns(cols)
      }
      return [
        {
          id: TABLE_X_DIY_ID,
          width: TABLE_X.WIDTH_FUN,
          maxWidth: TABLE_X.WIDTH_FUN,
          accessor: TABLE_X_DIY_ID,
          fixed: 'left',
          Cell: () => null,
          Header: () => (
            <OperationIcon
              tip={getLocale('表头设置')}
              style={{ marginLeft: '-5px' }}
              onClick={() => {
                Modal.render({
                  size: 'md',
                  noContentPadding: true,
                  children: (
                    <DiyTableXModal
                      diyModalClassName={diyModalClassName}
                      customSequence={customSequence}
                      columns={cols}
                      onSave={handleDiyColumnsSave}
                      onCancel={handleCancel}
                    />
                  ),
                })
              }}
            >
              <SVGSetting />
            </OperationIcon>
          ),
        },
        ...notDiyCols,
        ...diyColumns,
      ]
    }, [columns, diyCols])

    useEffect(() => {
      // 检查columns的长度或者key是否有变化
      const columnsHaveChanged =
        prevColumnsLength.current !== columns.length ||
        prevColumnsKeys.current.some((key, index) => key !== columns[index].id)

      if (columnsHaveChanged) {
        prevColumnsLength.current = columns.length
        prevColumnsKeys.current = columns.map((column) => column.id)
        setDiyCols(generateDiyColumns(columns, Storage.get(id) ?? [])[1])
      }
    }, [columns])

    return <Table {...(rest as Props)} id={id} columns={newColumns} />
  }

  return DiyTableX
}

export default diyTableXHOC
