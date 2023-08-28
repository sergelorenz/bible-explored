import React from 'react'
import classNames from 'classnames';
import PropTypes from 'prop-types'

import spinnerGif from '../../../res/images/loading.gif'

import './Spinner.scss';

type Props = {
  width?: string,
  className?: string
}


function Spinner({width, className}: Props) {
  return (
    <div className={classNames('spinner-wrapper', className)}>
      <img 
        className='spinner' 
        src={spinnerGif} alt='loading...' 
        style={{width: width}}
      />
    </div>
  )
}

Spinner.propTypes = {
  width: PropTypes.string
}

export default Spinner