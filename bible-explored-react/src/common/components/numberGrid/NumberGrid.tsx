import React from 'react'
import classNames from 'classnames';

import './NumberGrid.scss';

type Props = {
  maxValue: number,
  onSelectCell?: Function,
  className?: string
}

function NumberGrid({maxValue, onSelectCell, className}: Props) {
  return (
    <div className={classNames('number-grid', className)}>
      {[...Array(maxValue).keys()].map(item => (
        <div className='number-cell' key={item + 1}>
          {(item + 1).toString().padStart(2, '0')}
        </div>
      ))}
    </div>
  )
}

export default NumberGrid