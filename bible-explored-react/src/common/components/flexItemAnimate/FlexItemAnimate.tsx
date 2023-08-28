import React, { useState, useEffect } from 'react'

type Props = {
  children: any,
  styleProp: any,
}

function FlexItemAnimate({children, styleProp}: Props) {
  const [style, setStyle] = useState<any>(null);
  useEffect(() => {
    setTimeout(() => {
      setStyle(styleProp)
    }, 50)
  })

  const childClone = React.Children.map(children, (child) => (
    React.cloneElement(child, {
      style: style
    })
  ))

  return childClone;
}

export default FlexItemAnimate