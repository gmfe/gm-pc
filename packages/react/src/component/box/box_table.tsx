import React, { CSSProperties, FC, HTMLAttributes, ReactNode } from 'react'
import classNames from 'classnames'
import { Flex, FlexProps } from '../flex'
import BoxPagination from './box_pagination'
import { Pagination, PaginationProps } from '../pagination'
interface BoxTableProps {
  info?: ReactNode
  action?: ReactNode
  className?: string
  style?: CSSProperties
  headerProps?: FlexProps
  pagination?: PaginationProps
}

type BoxTableInfoProps = HTMLAttributes<HTMLDivElement>

const BoxTableInfo: FC<BoxTableInfoProps> = ({ className, ...rest }) => (
  <div {...rest} className={classNames(className, 'gm-box-table-info')} />
)

const BoxTable: FC<BoxTableProps> = ({
  info,
  action,
  children,
  className,
  headerProps = {},
  pagination,
  ...rest
}) => {
  const { className: headerClassName } = headerProps

  return (
    <>
      <div {...rest} className={classNames('gm-box', 'gm-box-table', className)}>
        <Flex
          {...headerProps}
          className={classNames('gm-box-table-header', headerClassName)}
          alignCenter
        >
          <Flex>{info}</Flex>
          <Flex flex />
          <Flex>{action}</Flex>
        </Flex>
        <div>{children}</div>
      </div>
      {pagination && (
        <BoxPagination>
          <Pagination {...pagination} />
        </BoxPagination>
      )}
    </>
  )
}

export { BoxTable, BoxTableInfo }
export default BoxTable
export type { BoxTableProps, BoxTableInfoProps }
