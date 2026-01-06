import { isInputUnBoundary, scrollIntoViewFixedWidth, doFocus } from './utils'

export const KeyboardUtil = { isInputUnBoundary, scrollIntoViewFixedWidth, doFocus }

export { default as keyboardTableXHOC } from './hoc/keyboard_table_x'

export { default as KC } from './cell/cell'
export { default as KCAutoComplete } from './cell/auto_complete'
export { default as KCInput } from './cell/input'
export { default as KCMoreSelect } from './cell/more_select'
export { default as KCInputNumber } from './cell/input_number'
export { default as KCLevelSelect } from './cell/level_select'
export { default as KCTableSelect } from './cell/table_select'
export { default as KCDatePicker } from './cell/date_picker'
export { default as KCSelect } from './cell/select'

// 从 @gm-pc/table-x 重新导出这些类型以保持向后兼容
export type { KeyboardTableXProps, KeyboardTableXColumn } from '@gm-pc/table-x'

export type { KeyboardCustomEvent, KeyboardDirection } from './types'
