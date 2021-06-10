export type Size = {
  width: number
  height: number
}

export function getContainerSize(ele: HTMLElement): Size {
  if (!ele) {
    return { width: 0, height: 0 }
  }
  const style = getComputedStyle(ele)

  return {
    width:
      (ele.clientWidth || parseInt(style.width, 10)) -
      parseInt(style.paddingLeft, 10) -
      parseInt(style.paddingRight, 10),
    height:
      (ele.clientHeight || parseInt(style.height, 10)) -
      parseInt(style.paddingTop, 10) -
      parseInt(style.paddingBottom, 10),
  }
}
