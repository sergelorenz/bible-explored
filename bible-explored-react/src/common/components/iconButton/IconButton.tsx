import React, { MouseEventHandler, ReactNode } from 'react'

type Props = {
  children: ReactNode,
  width?: string,
  onButtonClick?: MouseEventHandler<HTMLDivElement>
}

function IconButton({children, width='40px', onButtonClick}: Props) {
  return (
    <div className='icon-button' style={{width: width}} onClick={onButtonClick}>
      {children}
    </div>
  )
}

export default IconButton