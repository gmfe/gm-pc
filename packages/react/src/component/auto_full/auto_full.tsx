import React, { FC, HTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react'

interface Size {
  height: number
  width: number
}

interface AutoFullProps extends HTMLAttributes<HTMLDivElement> {
  children(size: Size): ReactNode
}

const fullStyle = {
  width: '100%',
  height: '100%',
}

const AutoFull: FC<AutoFullProps> = (props) => {
  const [size, setSize] = useState<Size | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      setSize({
        height: ref.current.offsetHeight,
        width: ref.current.offsetWidth,
      })
    }
  }, [])

  return (
    <div ref={ref} {...props} style={fullStyle}>
      {size && props.children(size)}
    </div>
  )
}
export default AutoFull
