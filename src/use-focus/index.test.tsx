import { cleanup, fireEvent } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useFocus } from '.';

describe('useFocus', () => {
  afterEach(cleanup);
  test('should register focus and blur events', () => {
    const el = document.createElement('div');
    el.tabIndex = 0;
    const spyAdd = spyOn(el, 'addEventListener');
    const spyRemove = spyOn(el, 'removeEventListener');

    const { unmount, result } = renderHook(() => useFocus({ current: el }));

    expect(spyAdd.calls.first().args[0]).toEqual('focus');
    expect(spyAdd.calls.mostRecent().args[0]).toEqual('blur');

    expect(result.current).toEqual(false);
    unmount();

    expect(spyRemove.calls.first().args[0]).toEqual('focus');
    expect(spyRemove.calls.mostRecent().args[0]).toEqual('blur');
  });

  test('should set focus when the element is focused', () => {
    const el = document.createElement('div');
    el.tabIndex = 0;

    const { result } = renderHook(() => useFocus({ current: el }));

    act(() => {
      fireEvent.focus(el);
    });

    expect(result.current).toEqual(true);

  });
});
