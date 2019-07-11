import { RefObject, useEffect } from 'react';

export function useDOMEvent(
  ref: RefObject<HTMLElement>,
  eventType: string,
  callback: (event: Event) => void,
  opts: AddEventListenerOptions = undefined) {

  useEffect(
    () => {
      if (!ref.current) {
        return;
      }
      const eventCallback = (e: Event) => {
        console.log('hey');
        callback(e);
      };
      ref.current.addEventListener(eventType, eventCallback, opts);

      return () => {
        ref.current.removeEventListener(eventType, eventCallback);
      };
    },
    [ref.current]);
}
