import React, { ComponentType, FC, useMemo } from 'react'
import { TABLE_X } from '../../utils'
import { TableXProps } from '../../base'
import { Column } from '../../'

function indexTableXHOC<Props extends TableXProps = TableXProps>(
  Table: ComponentType<Props>
) {
  const IndexTableX: FC<Props> = ({ columns, ...rest }) => {
    const _columns: Column[] = useMemo(
      () => [
        {
          Header: '序号',
          diyEnable: false,
          accessor: (_, index) => index + 1,
          fixed: 'left',
          width: TABLE_X.WIDTH_NO,
        },
        ...columns,
      ],
      [columns]
    )

    return <Table {...(rest as Props)} columns={_columns} />
  }

  return IndexTableX
}

export default indexTableXHOC
