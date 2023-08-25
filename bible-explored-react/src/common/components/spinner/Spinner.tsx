import React from 'react'
import PropTypes from 'prop-types'

import spinnerGif from '../../../res/images/loading.gif'

import './Spinner.scss';

type Props = {
  width?: number
}


function Spinner({width}: Props) {
  return (
    <div className='spinner-wrapper'>
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