import React, { useState } from 'react'
import classNames from 'classnames';
import PropTypes from 'prop-types'

import './Toggler.scss';

type Props = {
  label?: JSX.Element,
  className?: string,
  onToggleValue?: Function,
  defaultValue?: boolean
}

function Toggler({label, className, onToggleValue, defaultValue=true}: Props) {
  const [value, setValue] = useState(defaultValue)

  const handleTogglerClick = (e: React.MouseEvent<HTMLElement>) => {
    setValue(!value);
    if (onToggleValue) onToggleValue();
  }

  return (
    <div className={classNames('generic-toggler-parent', value ? 'toggler-true' : 'toggler-false', className)}>
      {label}
      <div className='toggler-track' onClick={handleTogglerClick}>
        <div className='toggler-thumb' />
      </div>
    </div>
  )
}

Toggler.propTypes = {
  label: PropTypes.object,
  className: PropTypes.string,
  onToggleValue: PropTypes.func,
  defaultValue: PropTypes.bool
}

export default Toggler
