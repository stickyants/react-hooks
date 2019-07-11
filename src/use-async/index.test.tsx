import { renderHook, act } from '@testing-library/react-hooks';
import { useAsync } from '.';

describe('use-async', () => {
  test('should not change view to error or success when cancelled', () => {
    const fn = jest.fn(() => new Promise(r => setTimeout(r, 5000)));
    const view = () => 'loading';
    const viewSuccess = () => 'success';
    const viewError = () => 'error';
    const { unmount, result } = renderHook(() => useAsync(fn, [], view, viewSuccess, viewError));
    expect(result.current).toBe('loading');
    unmount();
    expect(result.current).toBe('loading');
  });

  test('should change view to success when succeeds', async () => {
    const fn = jest.fn(() => new Promise(r => r()));
    const view = () => 'loading';
    const viewSuccess = () => 'success';
    const viewError = () => 'error';
    const { result, rerender } = renderHook(() => useAsync(fn, [], view, viewSuccess, viewError));
    expect(result.current).toBe('loading');
    await new Promise(r => setTimeout(r));
    expect(result.current).toBe('success');

  });

  test('should change view to error when fails', async () => {
    const fn = jest.fn(() => new Promise((_, r) => r()));
    const view = () => 'loading';
    const viewSuccess = () => 'success';
    const viewError = () => 'error';
    const { result } = renderHook(() => useAsync(fn, [], view, viewSuccess, viewError));
    expect(result.current).toBe('loading');
    await new Promise(r => setTimeout(r));
    expect(result.current).toBe('error');

  });
});
