import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { ReactComponent as DropDownIcon } from '../../../res/icons/dropdown-arrow.svg';

import './DropDown.scss';

function DropDown({className, children, placeHolder='Select an Option', value}) {
  const [isOpen, toggleOpen] = useState(false);

  const handleDropDownClick = () => {
    toggleOpen(!isOpen);
  }

  return (
    <div className={classNames('generic-dropdown-parent', className)}>
      <div className='dropdown-header' onClick={handleDropDownClick}>
        <span>{value ? value : placeHolder}</span>
        <DropDownIcon />
      </div>
      <div className={classNames('options', isOpen && 'open')}>
        {children}
      </div>
    </div>
  )
}

DropDown.propTypes = {
  className: PropTypes.string,
  placeHolder: PropTypes.string
}

export default DropDown
