import React, { ComponentType, FC, useContext, useState } from 'react'
import { TableXDataItem, TableXProps, TableXPropsType } from '../../base'
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { RowProps } from '@gm-pc/react'
import { CSS } from '@dnd-kit/utilities'
import SelectTableXContext from '../select_table_x/context'

export interface DndTableXProps extends TableXProps {
  onSortChange(data: TableXDataItem[]): void
  // 是否多选拖拽
  isMultiSelect?: boolean
}

// 拖拽预览组件
function DragOverlayContent({ dragLen }: { dragLen: number }) {
  // 是否是选中的
  return (
    <div className='gm-dnd-overlay'>
      <div className='flex items-center space-x-2'>
        <span className='font-medium text-blue-800'>拖拽 {dragLen} 个项目</span>
      </div>
    </div>
  )
}
const Row = (isMultiSelect?: boolean, dragLen? = 0): React.FC<Readonly<RowProps>> => (
  props
) => {
  const { selected } = useContext(SelectTableXContext)
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isSorting,
    isDragging,
  } = useSortable({
    id: (props as any)['data-id' as any] as string,
  })

  const isSelected = selected.includes((props as any)['data-id'])

  // 是否是选中并且在拖拽
  const isSelectedAndDragging = isMultiSelect
    ? (isSelected && isSorting) || isDragging
    : isDragging

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: 'move',
    ...(isSelectedAndDragging
      ? {
          position: 'relative',
          zIndex: 9999,
          opacity: isSelectedAndDragging ? 0 : 1,
        }
      : {}),
  }
  return <tr ref={setNodeRef} {...props} {...attributes} {...listeners} style={style} />
}

function dndTableXHOC(Table: ComponentType<TableXPropsType>) {
  const SortableTableX: FC<DndTableXProps> = ({
    id,
    data,
    onSortChange,
    isMultiSelect,
    keyField = 'value',
    columns,
    selected,
    ...rest
  }) => {
    const [activeId, setActiveId] = useState(null)

    const isIncludes = selected?.includes(activeId)
    const len = !isIncludes ? selected?.length + 1 : selected?.length

    const onDragEnd = ({ active, over }: DragEndEvent) => {
      // 早期退出：如果没有目标位置，直接返回
      if (!over?.id) return

      const activeId = active?.id
      const overId = over.id

      // 如果拖拽到相同位置，直接返回
      if (activeId === overId) return

      // 预计算索引，避免重复查找
      const oldIndex = data.findIndex((item) => item[keyField] === activeId)
      const newIndex = data.findIndex((item) => item[keyField] === overId)

      // 如果索引无效，直接返回
      if (oldIndex === -1 || newIndex === -1) return

      // 构建选中项目数组
      const selectedItemsArray = isMultiSelect ? [activeId, ...selected] : [activeId]

      if (selectedItemsArray.length > 1) {
        // 多选情况：使用 Set 优化查找性能
        const selectedSet = new Set(selectedItemsArray)

        // 一次遍历同时收集选中和未选中的项目
        const selectedItemsData = []
        const unselectedItems = []

        for (const item of data) {
          if (selectedSet.has(item[keyField])) {
            selectedItemsData.push(item)
          } else {
            unselectedItems.push(item)
          }
        }

        // 计算插入位置
        let insertIndex = newIndex
        if (oldIndex < newIndex) {
          insertIndex = newIndex - selectedItemsData.length + 1
        }
        insertIndex = Math.max(0, Math.min(insertIndex, unselectedItems.length))

        // 构建最终数组
        const newItems = [
          ...unselectedItems.slice(0, insertIndex),
          ...selectedItemsData,
          ...unselectedItems.slice(insertIndex),
        ]

        onSortChange(newItems)
      } else {
        // 单选情况：直接使用 arrayMove
        onSortChange(arrayMove(data, oldIndex, newIndex))
      }
    }
    const onDragStart = (event: DragStartEvent) => {
      const { active } = event
      setActiveId(active.id)
    }
    return (
      <DndContext
        modifiers={[restrictToVerticalAxis]}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={data.map((i) => i[keyField])}
          strategy={verticalListSortingStrategy}
        >
          <Table
            {...rest}
            selected={selected}
            components={{
              ...rest.components,
              body: {
                row: Row(isMultiSelect, len),
              },
            }}
            id={id}
            columns={columns}
            data={data}
            keyField={keyField}
          />
        </SortableContext>
        <DragOverlay>
          <DragOverlayContent dragLen={len} />
        </DragOverlay>
      </DndContext>
    )
  }

  return SortableTableX
}

export default dndTableXHOC
