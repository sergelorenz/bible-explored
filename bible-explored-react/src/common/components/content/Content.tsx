import { useEffect, ReactNode } from 'react'
import { useDispatch } from 'react-redux';

import { updateMenu } from '../../../app/parentSlice';

type Props = {
  children: JSX.Element
}

function Content({ children } : Props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateMenu());
  }, [dispatch])

  return children;
}


export default Content
