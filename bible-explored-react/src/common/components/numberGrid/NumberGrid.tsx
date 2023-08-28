import React from 'react'
import classNames from 'classnames';

import './NumberGrid.scss';

type Props = {
  maxValue: number,
  onSelectCell?: any,
  className?: string,
  selectedCell?: number
}

function NumberGrid({maxValue, onSelectCell, className, selectedCell=1}: Props) {
  return (
    <div className={classNames('number-grid', className)}>
      {[...Array(maxValue).keys()].map(item => (
        <div 
          className={classNames('number-cell', selectedCell == item + 1 && 'selected')} 
          key={item + 1}
          data-key={item + 1}
          onClick={onSelectCell}
        >
          {(item + 1).toString().padStart(2, '0')}
        </div>
      ))}
    </div>
  )
}

export default NumberGrid