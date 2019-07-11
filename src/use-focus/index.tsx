import { useState, useCallback } from 'react';
import { useDOMEvent } from '../use-domevent';

export function useFocus(
  ref: React.RefObject<HTMLElement>,
  initialFocus = false) {
  const [isFocused, setFocus] = useState(initialFocus);

  useDOMEvent(ref, 'focus', () => { setFocus(true); });

  useDOMEvent(ref, 'blur', () => { setFocus(false); });

  return isFocused;
}

export function useFocusBlur() {
  const [isFocused, setFocus] = useState(false);

  const onFocus = useCallback(() => setFocus(true), []);
  const onBlur = useCallback(() => setFocus(false), []);

  return [isFocused, onFocus, onBlur];
}
