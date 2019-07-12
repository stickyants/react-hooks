import * as debounce from 'lodash.debounce';
import { useDOMEvent } from '../use-domevent';
import { useCallback } from 'react';

export function useDebouncedDOMEvent(
  ref: React.RefObject<HTMLElement>,
  eventType: string,
  callback: (e: Event) => void,
  opts: AddEventListenerOptions = undefined,
  debounceOptions: {
    leading?: boolean,
    trailing?: boolean,
    maxWait?: number,
  } = { trailing: true, maxWait: 250 }) {
  const debouncedCallback = useCallback(debounce(callback, debounceOptions), [callback]);
  useDOMEvent(ref, eventType, debouncedCallback, opts);
}
