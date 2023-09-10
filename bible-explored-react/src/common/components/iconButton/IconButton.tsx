import React, { MouseEventHandler, ReactNode } from 'react'

import './IconButton.scss';

type Props = {
  children: ReactNode,
  width?: string,
  onButtonClick?: MouseEventHandler<HTMLDivElement>
}

function IconButton({children, width='45px', onButtonClick}: Props) {
  return (
    <div className='icon-button' style={{width: width, height: width}} onClick={onButtonClick}>
      {children}
    </div>
  )
}

export default IconButton