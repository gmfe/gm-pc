import React, { FC } from 'react'
import _ from 'lodash'
import { is } from '@gm-common/tool'
import { NavData } from '@gm-pc/react'

type NavConfig = NavData

interface BreadCrumbsItem {
  name: string
  link?: string
  sub?: BreadCrumbsItem[]
}

type BreadCrumb = string[] | BreadCrumbsItem[]

interface BreadcrumbProps {
  breadcrumbs: BreadCrumb
  pathname: string
  navConfig: NavConfig[]
  onSelect(selected: BreadCrumbsItem): void
}

const nav2BreadCrumb = (
  breadcrumbs: BreadCrumb,
  pathname: string,
  navConfig: NavConfig[]
): BreadCrumbsItem[] => {
  const result: BreadCrumbsItem[] = []

  _.find(navConfig, (one) => {
    _.find(one.sub, (two) => {
      return _.find(two.sub, (three) => {
        if (pathname.includes(three.link)) {
          result.push(one)
          result.push(two as any)
          result.push(three as any)

          return true
        }
        return false
      })
    })
  })

  _.forEach(breadcrumbs, (v) => {
    if (_.isString(v)) {
      result.push({ name: v })
    } else {
      // @ts-ignore
      result.push({ name: v.name, link: v.link || pathname })
    }
  })

  return result
}

const Breadcrumb: FC<BreadcrumbProps> = ({
  breadcrumbs,
  pathname,
  navConfig,
  onSelect,
}) => {
  const data = nav2BreadCrumb(breadcrumbs, pathname, navConfig)

  if (!data || data.length === 0) {
    return <div className='gm-framework-breadcrumb-default' />
  }

  const last = data[data.length - 1]

  const arr = (
    <>
      {_.map(data.slice(0, -1), (v, i) => (
        <a
          key={i + '_' + v.link}
          href={v.link}
          onClick={(e) => {
            e.preventDefault()
            if (i === 0) {
              // @ts-ignore
              onSelect(data[0].sub[0].sub[0])
            } else if (i === 1) {
              // @ts-ignore
              onSelect(data[1].sub[0])
            } else if (i === 2) {
              onSelect(data[2])
            } else {
              onSelect(v)
            }
          }}
        >
          {v.name}
        </a>
      ))}
    </>
  )

  return (
    <div className='gm-framework-breadcrumb-default'>
      {!is.phone() && arr}
      {last.link ? (
        <a
          href={last.link}
          className='gm-text-primary'
          onClick={(event) => {
            event.preventDefault()
            onSelect(last)
          }}
        >
          {last.name}
        </a>
      ) : (
        <span>{last.name}</span>
      )}
    </div>
  )
}

export default Breadcrumb
export type { BreadcrumbProps, BreadCrumbsItem }
