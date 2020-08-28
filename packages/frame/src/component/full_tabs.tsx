import React, { FC } from 'react'
import classNames from 'classnames'
import { Tabs, TabsItem, TabsProps } from '@gm-pc/react'

type FullTabsProps = TabsProps
type FullTabsItem = TabsItem

const FullTabs: FC<FullTabsProps> = ({ className, ...rest }) => {
  return <Tabs {...rest} className={classNames('gm-framework-full-tabs', className)} />
}

export default FullTabs
export type { FullTabsProps, FullTabsItem }
