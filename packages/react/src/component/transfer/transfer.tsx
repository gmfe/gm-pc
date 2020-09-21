import React, { useState, useMemo, FC } from 'react'
import { getLocale } from '@gm-pc/locales'
import { Tree } from '../tree'
import { Flex } from '../flex'
import SvgRightSmall from '../../svg/right-small.svg'
import SvgLeftSmall from '../../svg/left-small.svg'
import { Button } from '../button'
import _ from 'lodash'
import filterGroupListLeaf from '../../common/utils/filter_group_list_leaf'
import { Value, TransferListItem, TransferProps } from './types'

function getLeftAndRightList(
  list: TransferListItem[],
  selectedValues: Value[],
  rightTree?: boolean
) {
  let rightList: TransferListItem[] = []
  const leftList = filterGroupListLeaf(list, (leaf) => {
    const isRight = selectedValues.includes(leaf.value)
    if (isRight) {
      rightList.push(leaf)
    }
    return !isRight
  })

  if (rightTree) {
    rightList = filterGroupListLeaf(list, (leaf) => {
      return _.includes(selectedValues, leaf.value)
    })
  }

  return [leftList, rightList]
}

interface State {
  lefts: Value[]
  rights: Value[]
}

const Transfer: FC<TransferProps> = ({
  list,
  selectedValues,
  onSelectValues,
  rightTree,
  className,
  style,

  leftTitle = getLocale('待选择'),
  leftPlaceholder,
  leftWithFilter,
  leftRenderLeafItem,
  leftRenderGroupItem,
  leftStyle = { width: '300px', height: '500px' },
  leftClassName,

  rightTitle = getLocale('已选择'),
  rightPlaceholder,
  rightWithFilter,
  rightRenderLeafItem,
  rightRenderGroupItem,
  rightStyle = { width: '300px', height: '500px' },
  rightClassName,

  ...rest
}) => {
  const [{ lefts, rights }, setLeftRights] = useState<State>({
    lefts: [],
    rights: [],
  })

  const [leftList, rightList] = useMemo(() => {
    return getLeftAndRightList(list, selectedValues, rightTree)
  }, [list, selectedValues, rightTree])

  const handleLefts = (values: Value[]) => {
    setLeftRights({
      lefts: values,
      rights,
    })
  }
  const handleRights = (values: Value[]) => {
    setLeftRights({
      lefts,
      rights: values,
    })
  }

  const handleClick = (isLeft: boolean) => {
    setLeftRights({ lefts: [], rights: [] })
    onSelectValues(_.xor(selectedValues, isLeft ? rights : lefts))
  }

  const handleToLeft = () => {
    handleClick(true)
  }

  const handleToRight = () => {
    handleClick(false)
  }

  return (
    <Flex className={className} {...rest}>
      <Tree
        list={leftList}
        onSelectValues={handleLefts}
        selectedValues={lefts}
        title={leftTitle}
        placeholder={leftPlaceholder}
        withFilter={leftWithFilter}
        renderLeafItem={leftRenderLeafItem}
        renderGroupItem={leftRenderGroupItem}
        style={leftStyle}
      />
      <div className='gm-gap-5' />
      <Flex column justifyCenter alignCenter className='gm-transfer-operation'>
        <Button
          className='gm-margin-bottom-5'
          plain
          disabled={lefts.length === 0}
          onClick={handleToRight}
        >
          <SvgRightSmall />
        </Button>
        <Button plain disabled={rights.length === 0} onClick={handleToLeft}>
          <SvgLeftSmall />
        </Button>
      </Flex>
      <div className='gm-gap-5' />
      <Tree
        list={rightList}
        onSelectValues={handleRights}
        selectedValues={rights}
        title={rightTitle}
        placeholder={rightPlaceholder}
        withFilter={rightWithFilter}
        renderLeafItem={rightRenderLeafItem}
        renderGroupItem={rightRenderGroupItem}
        style={rightStyle}
      />
    </Flex>
  )
}

export default Transfer
