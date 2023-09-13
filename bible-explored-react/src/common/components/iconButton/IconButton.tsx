import React, { MouseEventHandler, ReactNode } from 'react'
import classNames from 'classnames';

import './IconButton.scss';

type Props = {
  children: ReactNode,
  width?: string,
  className?: string,
  onButtonClick?: MouseEventHandler<HTMLDivElement>,
  tooltip?: string
}

function IconButton({children, className, width='45px', onButtonClick, tooltip=''}: Props) {
  return (
    <div className={classNames('icon-button', className)} style={{width: width, height: width}} onClick={onButtonClick} title={tooltip}>
      {children}
    </div>
  )
}

export default IconButton