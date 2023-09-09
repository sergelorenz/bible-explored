import React from 'react'

import Content from '../../common/components/content/Content'
import VerseSelector from '../../common/components/verseSelector/VerseSelector'

function SideBySide() {
  return (
    <Content>
      <div className='content side-by-side'>
        <VerseSelector defaultBook='JHN' defaultChapter={1} defaultVerse={1}/>
      </div>
    </Content>
  )
}

export default SideBySide