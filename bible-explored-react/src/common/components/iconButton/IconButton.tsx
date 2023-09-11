import React, { MouseEventHandler, ReactNode } from 'react'

import './IconButton.scss';

type Props = {
  children: ReactNode,
  width?: string,
  onButtonClick?: MouseEventHandler<HTMLDivElement>,
  tooltip?: string
}

function IconButton({children, width='45px', onButtonClick, tooltip=''}: Props) {
  return (
    <div className='icon-button' style={{width: width, height: width}} onClick={onButtonClick} title={tooltip}>
      {children}
    </div>
  )
}

export default IconButton