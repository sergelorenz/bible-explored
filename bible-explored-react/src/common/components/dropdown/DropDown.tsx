import React, { useState, ReactNode, forwardRef, useImperativeHandle, useRef } from 'react'
import classNames from 'classnames'

import { ReactComponent as DropDownIcon } from '../../../res/icons/dropdown-arrow.svg';

import './DropDown.scss';

type Props = {
  className?: string,
  children: ReactNode,
  value: string,
  isDisabled?: boolean
}

export type DropDownHandle = {
  toggleDropDown: () => void;
}

const DropDown = forwardRef<DropDownHandle, Props>(function DropDown(
  {
    className, 
    children,
    value,
    isDisabled=false
  }: Props, 
  ref
) {
  const [isOpen, toggleOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement | null>(null);

  useImperativeHandle(ref, () => ({
    toggleDropDown() {
      toggleOpen(!isOpen);
    }
  }))

  const handleDropDownClick = () => {
    if (!isDisabled) {
      toggleOpen(!isOpen);
      if (dropDownRef.current && !isOpen) {
        dropDownRef.current.scrollTop = 0;
      }
    }
  }

  return (
    <div className={classNames('generic-dropdown-parent', className)}>
      <div className='dropdown-header' onClick={handleDropDownClick}>
        <span>{value}</span>
        <DropDownIcon />
      </div>
      <div className={classNames('options', isOpen && 'open')} ref={dropDownRef}>
        {children}
      </div>
    </div>
  )
})

export default DropDown
