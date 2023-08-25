import React, { useState, ReactNode, forwardRef, useImperativeHandle } from 'react'
import classNames from 'classnames'

import { ReactComponent as DropDownIcon } from '../../../res/icons/dropdown-arrow.svg';

import './DropDown.scss';

type Props = {
  className?: string,
  children: ReactNode,
  value: string
}

export type DropDownHandle = {
  toggleDropDown: () => void;
}

const DropDown = forwardRef<DropDownHandle, Props>(function DropDown(
  {
    className, 
    children,
    value
  }: Props, 
  ref
) {
  const [isOpen, toggleOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    toggleDropDown() {
      toggleOpen(!isOpen);
    }
  }))

  const handleDropDownClick = () => {
    toggleOpen(!isOpen);
  }

  return (
    <div className={classNames('generic-dropdown-parent', className)}>
      <div className='dropdown-header' onClick={handleDropDownClick}>
        <span>{value}</span>
        <DropDownIcon />
      </div>
      <div className={classNames('options', isOpen && 'open')}>
        {children}
      </div>
    </div>
  )
})

export default DropDown
