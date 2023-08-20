import { useEffect } from 'react'
import { useDispatch } from 'react-redux';

import { updateMenu } from '../../../app/parentSlice';

function Content({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateMenu());
  }, [dispatch])

  return children;
}


export default Content
