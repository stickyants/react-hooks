import { renderHook } from '@testing-library/react-hooks';
import { useDebouncedDOMEvent } from '.';

describe('useDebouncedDOMEvent', () => {
  test('should combine multiple events into one', async () => {
    const el = document.createElement('div');
    const ref = { current: el };
    const cb = jest.fn(() => { });

    renderHook(() => useDebouncedDOMEvent(ref, 'click', cb));

    el.dispatchEvent(new Event('click'));
    el.dispatchEvent(new Event('click'));
    el.dispatchEvent(new Event('click'));
    el.dispatchEvent(new Event('click'));
    el.dispatchEvent(new Event('click'));

    await new Promise(r => setTimeout(r, 50));

    expect(cb).toHaveBeenCalledTimes(1);
  });
});
