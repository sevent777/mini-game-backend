import { useCallback, useEffect, useRef, useState } from 'react';

export const useMount = (cb: () => void) =>
  useEffect(() => {
    cb();
  }, []);

export const useDidUpdate = (cb: () => void, dependencies: ReadonlyArray<unknown>) => {
  const hasMounted = useRef(false);
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    cb();
  }, dependencies);
};

export const useForceUpdate = () => {
  const [, setState] = useState({});
  const forceUpdate = useCallback(() => setState({}), []);
  return forceUpdate;
};
