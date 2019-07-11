import { useState } from 'react';
import { useDOMEvent } from '../use-domevent';

export function useFocus(
  ref: React.RefObject<HTMLElement>,
  initialFocus = false) {
  const [isFocused, setFocus] = useState(initialFocus);

  useDOMEvent(ref, 'focus', () => { setFocus(true); });

  useDOMEvent(ref, 'blur', () => { setFocus(false); });

  return isFocused;
}
