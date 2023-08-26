import { useEffect } from 'react';

export const useLazyFums = (useLazyQuery: Function) => {
  const [triggerFn, results] = useLazyQuery();
  useEffect(() => {
    if (results.data) {
      // CURRENTLY DISABLED DURING DEVELOPMENT - Please enable when live
      //// @ts-ignore - the fums function is available via the script tag in the index.html
      // fums("trackView", result.data.meta.fumsToken)
    }
  }, [])
  return [triggerFn, results];
}