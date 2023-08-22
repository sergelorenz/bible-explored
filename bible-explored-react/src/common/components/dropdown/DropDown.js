import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { ReactComponent as DropDownIcon } from '../../../res/icons/dropdown-arrow.svg';

import './DropDown.scss';

function DropDown({className, children, placeHolder='Select an Option'}) {
  return (
    <div className={classNames('generic-dropdown-parent', className)}>
      <div className='dropdown-header'>
        <span>{placeHolder}</span>
        <DropDownIcon />
      </div>
      <div className='options'>
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
