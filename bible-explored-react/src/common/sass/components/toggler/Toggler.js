import React, { useState } from 'react'
import classNames from 'classnames';
import PropTypes from 'prop-types'

import './Toggler.scss';

function Toggler({label, className, onToggleValue, defaultValue=true}) {
  const [value, setValue] = useState(defaultValue)

  const handleTogglerClick = _ => {
    setValue(!value);
    if (onToggleValue) onToggleValue(value);
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
