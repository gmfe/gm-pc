import {
  ReactNode,
  ReactElement,
  isValidElement,
  cloneElement as ReactCloneElement,
} from 'react'

type AnyObject = Record<any, any>

export type RenderProps =
  | undefined
  | AnyObject
  | ((originProps: AnyObject) => AnyObject | undefined)

export function replaceElement(
  element: ReactNode,
  replacement: ReactNode,
  props: RenderProps
): ReactNode {
  if (!isValidElement(element)) return replacement

  return ReactCloneElement(
    element,
    typeof props === 'function' ? props(element.props || {}) : props
  )
}
export function cloneElement(element: ReactNode, props?: RenderProps): ReactElement {
  return replaceElement(element, element, props) as ReactElement
}
