import { EVENT_TYPE } from '@gm-pc/react'

function afterScroll() {
  window.dispatchEvent(new window.CustomEvent(EVENT_TYPE.TABLE_SCROLL))
}

export default afterScroll
