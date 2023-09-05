import React, { useState, useRef } from 'react'
import classNames from 'classnames';

import { ReactComponent as ArrowDown } from '../../../../res/icons/angle-bottom-icon.svg';

import AppearAnimate, { AppearAnimateHandle } from '../../../../common/components/appearAnimate/AppearAnimate';

import './ProblemCard.scss';

type Problem = {
  description: string,
  verses: string[]
}

type Props = {
  problemItem: Problem
}

function ProblemCard({problemItem: {description, verses}}: Props) {
  const [ isOpen, toggleOpen ] = useState(false);
  const areVersesLoaded = useRef<number[]>(Array.from({length: verses.length}, _ => 0))
  const problemCardRef = useRef<AppearAnimateHandle | null>(null);

  const handleProblemCardHeaderClicked = (e: React.MouseEvent<HTMLElement>) => {
    toggleOpen(!isOpen);
  }

  const setVerseLoaded = (index: number, type: number) => {
    areVersesLoaded.current[index] = type;
  }

  return (
    <div className='problem-card-parent'>
      <div 
        className={classNames('problem-card-header', isOpen && 'open')}
        onClick={handleProblemCardHeaderClicked}
      >
        <p>{description}</p>
        <ArrowDown />
      </div>
      {areVersesLoaded.current.every(item => item === 1) && (
        <AppearAnimate styleAppear={{opactiy: '1', fontSize: '18px'}}>

        </AppearAnimate>
      )}
    </div>
  )
}

export default ProblemCard