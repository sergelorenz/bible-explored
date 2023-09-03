import React from 'react'

import './ProblemCard.scss';

type Problem = {
  description: string,
  verses: string[]
}

type Props = {
  problemItem: Problem
}

function ProblemCard({problemItem: {description, verses}}: Props) {
  return (
    <div className='problem-card'>
      {description}
    </div>
  )
}

export default ProblemCard