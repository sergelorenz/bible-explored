import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import DOMPurify from 'dompurify';

import { ReactComponent as ArrowDown } from '../../../../res/icons/angle-bottom-icon.svg';

import { addError } from '../../../../app/parentSlice';

import Spinner from '../../../../common/components/spinner/Spinner';
import AppearAnimate, { AppearAnimateHandle } from '../../../../common/components/appearAnimate/AppearAnimate';

import PassageLoader from './PassageLoader';

import './ProblemCard.scss';

type Problem = {
  description: string,
  verses: string[],
}

type Props = {
  problemItem: Problem,
}

function ProblemCard({problemItem: {description, verses}}: Props) {
  const dispatch = useDispatch();
  const [ isOpen, toggleOpen ] = useState(false);
  const [ isCardLoaded, toggleCardLoaded ] = useState(false);
  const [ isCardClicked, toggleCardClicked ] = useState(false);
  const [ passages, setPassages ] = useState(Array.from({length: verses.length}, _ => ''));
  const problemCardRef = useRef<AppearAnimateHandle | null>(null);
  useEffect(() => {
    if (!isCardLoaded && passages.some(item => item !== '' && item !== 'Error')) {
      toggleOpen(true);
      toggleCardLoaded(_ => true);
    }
    if (passages.every(item => item === 'Error')) {
      dispatch(addError(`Could not fetch passages for the card ${description.toUpperCase()}. Please try a different Bible Version.`))
    }
  }, [passages])

  const handleProblemCardHeaderClicked = (e: React.MouseEvent<HTMLElement>) => {
    toggleCardClicked(true);
    if (isOpen) {
      toggleOpen(false);
      problemCardRef.current?.disappear();
    } else if (passages.every(item => item !== '')) {
      toggleOpen(true);
      problemCardRef.current?.appear();
    }
  }

  const setVerseLoaded = (index: number, passage: string) => {
    setPassages(prevPassages => [
      ...prevPassages.slice(0, index),
      passage,
      ...prevPassages.slice(index + 1)
    ]);
  }

  return (
    <div className='problem-card-parent' data-cy={description}>
      <div 
        className={classNames('problem-card-header', isOpen && 'open')}
        onClick={handleProblemCardHeaderClicked}
      >
        <p>{description}</p>
        { isCardClicked && passages.every(item => item === '') && <Spinner className='problem-card-spinner'/>}
        <ArrowDown />
      </div>
      { isCardClicked && (
        verses.map((verse, index) => (
          <PassageLoader verse={verse} onVerseLoad={setVerseLoaded} index={index} key={index}/>
        ))
      )}
      {passages.every(item => item !== '') && (
        <AppearAnimate 
          styleAppear={{transform: 'scaleY(1)', opacity: '1', lineHeight: '25px', fontSize: '16px'}}
          styleDisappear={{transform: 'scaleY(0)', opacity: '0', lineHeight: '0px', fontSize: '0'}}
          ref={problemCardRef}
        >
          <div className='guidance-passages'>
            {passages.map((passage, index) => (
              passage !== 'Error' && (
                <div className='passage-for-problem' key={index}>
                  { index === 0 && <hr />}
                  <div 
                    className='scripture-styles' 
                    data-cy='passage-for-problem' 
                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(passage)}}
                  />
                  <hr />
                </div>
              )
            ))}
          </div>
        </AppearAnimate>
      )}
    </div>
  )
}

export default ProblemCard