// @ts-nocheck
import { useLayoutEffect } from 'react';
import { useDeck } from '@/lib/deck-store';

/**
 * Register in-slide click builds. useLayoutEffect so steps land before
 * the first paint/click after a URL goto (goto resets steps to 0).
 */
export function useSlideSteps(count) {
  const { setSteps, step } = useDeck();
  useLayoutEffect(() => {
    setSteps(count);
  }, [count, setSteps]);
  return step;
}
