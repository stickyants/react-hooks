import { renderHook } from '@testing-library/react-hooks';
import { fireEvent } from '@testing-library/dom';
import { cleanup } from '@testing-library/react';
import { useDOMEvent } from './index';

describe('useDOMEvent', () => {
  afterEach(cleanup);
  test('should register event correctly', async () => {
    const el = document.createElement('div');
    const callback = jest.fn(() => { });
    const addSpy = spyOn(el, 'addEventListener');
    const removeSpy = spyOn(el, 'removeEventListener');
    const ref = {
      current: el,
    };
    const { unmount } = renderHook(() => useDOMEvent(ref, 'click', callback));
    expect(addSpy).toHaveBeenCalled();
    unmount();
    expect(removeSpy).toHaveBeenCalled();
  });

  test('should call callback when dom event is fired', () => {
    const el = document.createElement('div');
    const callback = jest.fn(() => { });
    const ref = {
      current: el,
    };
    renderHook(() => useDOMEvent(ref, 'click', callback));
    fireEvent.click(el);
    expect(callback).toHaveBeenCalled();
  });
});
