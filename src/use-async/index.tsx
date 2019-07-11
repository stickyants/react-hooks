import { useEffect, useState, useRef } from 'react';

async function* executor<T>(fn: (...args: any[]) => Promise<T>, ...params: any[]) {
  const result = await fn(...params);
  yield result;
}

export function useAsync<T>(
  fn: (...args: any[]) => Promise<T>,
  deps = [],
  loadingView: () => React.ReactNode,
  successView: (val: T) => React.ReactNode,
  errorView: (err: Error) => React.ReactNode) {
  const [view, setView] = useState(loadingView);
  const ref = useRef(null);

  useEffect(
    () => {
      setView(loadingView());
      ((async () => {
        ref.current = executor(fn, ...deps);
        try {
          const result = await ref.current.next();
          setView(successView(result));
        } catch (err) {
          setView(errorView(err));
        }
      })());

      return () => {
        ref.current.throw(new Error('cancelled'));
      };
    },
    deps);

  return view;
}
