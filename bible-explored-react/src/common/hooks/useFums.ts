import { useEffect } from 'react';

export const useFums = (useQuery: Function, args: any = null) => {
  const result = useQuery(args);
  useEffect(() => {
    if (result.data) {
      // CURRENTLY DISABLED DURING DEVELOPMENT - Please enable when live
      // @ts-ignore - the fums function is available via the script tag in the index.html
      fums("trackView", result.data.meta.fumsToken)
    }
  }, [result.data])
  return result;
}