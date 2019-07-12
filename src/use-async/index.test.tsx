import { renderHook, act } from '@testing-library/react-hooks';
import { useCancellableAsync } from '.';

describe('use-async', () => {
  test('should not change view to error or success when cancelled', () => {
    const fn = jest.fn(() => new Promise(r => setTimeout(r, 5000)));

    const view = () => 'loading';
    const viewSuccess = () => 'success';
    const viewError = () => 'error';

    const { unmount, result } = renderHook(
      () => useCancellableAsync(fn, [], view, viewSuccess, viewError));

    expect(result.current).toBe('loading');

    unmount();

    expect(result.current).toBe('loading');
  });

  test('should change view to success when succeeds', async () => {
    const fn = jest.fn(() => new Promise(r => r()));

    const view = () => 'loading';
    const viewSuccess = () => 'success';
    const viewError = () => 'error';
    const { result } = renderHook(() => useCancellableAsync(fn, [], view, viewSuccess, viewError));

    const error = console.error;
    console.error = () => { };

    expect(result.current).toBe('loading');

    await new Promise(r => setTimeout(r));

    expect(result.current).toBe('success');

    console.error = error;

  });

  test('should change view to error when fails', async () => {
    const fn = jest.fn(() => new Promise((_, r) => r()));

    const view = () => 'loading';
    const viewSuccess = () => 'success';
    const viewError = () => 'error';

    const { result } = renderHook(() => useCancellableAsync(fn, [], view, viewSuccess, viewError));

    const error = console.error;
    console.error = () => { };

    expect(result.current).toBe('loading');

    await new Promise(r => setTimeout(r));

    expect(result.current).toBe('error');

    console.error = error;

  });
});
