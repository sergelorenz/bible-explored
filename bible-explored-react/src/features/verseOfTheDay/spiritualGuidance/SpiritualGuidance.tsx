import React from 'react'

import { Problem } from '../../../../types/types'

import { SPIRITUAL_GUIDANCE_VERSES } from '../../../common/constants'

import ProblemCard from './problemCard/ProblemCard'

import './SpiritualGuidance.scss';

function SpiritualGuidance() {

  const renderProblemItems = (problemItems: Problem[]) => (
    <div className='problem-items'>
      {problemItems.map((problemItem, i) => (
        <ProblemCard problemItem={problemItem} key={problemItem.description} problemCardKey={problemItem.description}/>
      ))}
    </div>
  )

  return (
    <div className='spiritual-guidance'>
      <h2>Spiritual Guidance</h2>
      <hr />
      <h3>ARE YOU...</h3>
      {renderProblemItems(SPIRITUAL_GUIDANCE_VERSES)}
    </div>
  )
}

export default SpiritualGuidance