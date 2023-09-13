import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'

type Props = {
  children: any,
  styleAppear: any,
  styleDisappear?: any,
  enableRemove?: boolean
}

export type AppearAnimateHandle = {
  appear: () => void;
  disappear: () => void;
}

const AppearAnimate = forwardRef<AppearAnimateHandle, Props>(function AppearAnimate(
  {
    children,
    styleAppear,
    styleDisappear,
    enableRemove=true
  }: Props,
  ref
){
  const [style, setStyle] = useState<any>(null);
  const [active, toggleActive] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStyle(styleAppear)
    }, 50)
  }, [])

  useImperativeHandle(ref, () => ({
    appear() {
      toggleActive(true);
      setTimeout(() => {
        setStyle(styleAppear);
      }, 50)
    },
    disappear() {
      setStyle(styleDisappear);
      if (enableRemove) {
        setTimeout(() => {
          toggleActive(false);
        }, 300)
      }
    }
  }))

  const childClone = React.Children.map(children, (child) => (
    React.cloneElement(child, {
      style: style
    })
  ))

  return active && childClone;
})


export default AppearAnimate