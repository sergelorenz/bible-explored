import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import classNames from 'classnames';

import { addError } from '../../../app/parentSlice';

import { useGetBiblesQuery } from '../../../services/bibleExplored';

import { BibleLanguageGroup } from '../../../../types/types';

import DropDown, { DropDownHandle } from '../dropdown/DropDown';
import Spinner from '../spinner/Spinner';

import './BibleGroupSelector.scss';

type Props = {
  hasButton?: boolean,
  dropDownClassName?: string,
  dispatchSelectBible?: Function,
  onSelectBible?: Function,
  defaultValue?: Bible | null
}

export type Bible = {
  id: string,
  name: string
}

function BibleGroupSelector({hasButton=true, dropDownClassName, dispatchSelectBible, onSelectBible, defaultValue=null}: Props) {
  const dispatch = useDispatch()
  const [ bible, setBible ] = useState<Bible | null>(defaultValue);
  const bibleVersionsRef = useRef<DropDownHandle | null>(null);
  const { data: dataBibles, isLoading: isLoadingBibles, isError: isErrorBibles } = useGetBiblesQuery();

  useEffect(() => {
    if (isErrorBibles) {
      dispatch(addError('Apologies, Bible Versions Data could not be fetched right now. Please try again later.'))
    }
  }, [isErrorBibles])

  const handleSelectBible = (bible: Bible) => {
    setBible(bible);
    bibleVersionsRef.current?.toggleDropDown();
    if (!hasButton) {
      if (dispatchSelectBible) {
        dispatch(dispatchSelectBible(bible));
      } else if (onSelectBible) {
        onSelectBible(bible);
      }
    }
  }

  const handlePressGo = (e: React.MouseEvent<HTMLElement>) => {
    if (bible) {
      if (dispatchSelectBible) {
        dispatch(dispatchSelectBible(bible))
      } else if (onSelectBible) {
        onSelectBible(bible);
      }
    }
  }

  const renderBibleGroups = (bibleGroups: BibleLanguageGroup[]) => {
    return (
      bibleGroups.map(bibleGroup => (
        <div className='bible-group' key={bibleGroup.languageId}>
          <p>{bibleGroup.languageName}</p>
          <ul>
            {bibleGroup.bibles.map(bible => (
              <li 
                title={bible.bibleName}
                data-cy={bible.bibleName} 
                key={bible.bibleId}
                onClick={() => handleSelectBible({
                  id: bible.bibleId,
                  name: bible.bibleName,
                })}
              >
                {bible.bibleName}
              </li>
            ))}
          </ul>
        </div>
      ))
    )
  }

  return (
    <div className='bible-select-area'>
      <DropDown
        className={classNames('bible-select', dropDownClassName)}
        value={bible ? bible.name : 'Select a Bible Version'}
        ref={bibleVersionsRef}
      >
        {isLoadingBibles && <Spinner />}
        {dataBibles && renderBibleGroups(dataBibles)}
      </DropDown>
      {hasButton && (
        <input data-cy='bible-select-go' type='button' value='GO' onClick={handlePressGo} />
      )}
    </div>
  )
}


export default BibleGroupSelector
