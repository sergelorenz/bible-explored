import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import { popError } from '../../../app/parentSlice';

import { ReactComponent as CloseIcon } from '../../../res/icons/close-icon.svg';

import { RootState } from '../../../app/store';
import { ERROR_SHOW_DURATION_MILLISECONDS } from '../../constants';

import './ErrorPopup.scss';


function ErrorPopup() {
  const dispatch = useDispatch();
  const [isErrorShown, toggleErrorShown] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const errors = useSelector((state:RootState) => state.parent.errors);

  useEffect(() => {
    if (errors.length > 0) {
      toggleErrorShown(true);
    }
  }, [errors])
  useEffect(() => {
    if (isErrorShown) {
      timeout.current = setTimeout(() => {
        toggleErrorShown(false);
        popErrorAction();
      }, ERROR_SHOW_DURATION_MILLISECONDS)
    }
  }, [isErrorShown])

  const popErrorAction = () => {
    setTimeout(() => {
      dispatch(popError());
    }, 500)
  }

  const handleCloseErrorPopup = (e: React.MouseEvent<HTMLElement>) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
      toggleErrorShown(false);
      popErrorAction();
    }
  }


  return (
    <div className={classNames('error-popup', isErrorShown && 'show')}>
      <div className='error-message'>
        <h3>{errors.length > 0 ? errors[0] : ''}</h3>
        <div className='close-icon-wrapper' onClick={handleCloseErrorPopup}>
          <CloseIcon />
        </div>
      </div>
    </div>
  )
}

export default ErrorPopup