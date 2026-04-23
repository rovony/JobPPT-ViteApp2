import { useCallback, useEffect, useState } from 'react';

/**
 * useFullscreen — wraps the browser Fullscreen API with cross-browser
 * prefixes and reactive state. No external deps.
 *
 * Returns { isFullscreen, enter, exit, toggle }.
 */
export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(() => !!getFsElement());

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!getFsElement());
    const events = ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'];
    events.forEach((e) => document.addEventListener(e, onChange));
    return () => events.forEach((e) => document.removeEventListener(e, onChange));
  }, []);

  const enter = useCallback((el = document.documentElement) => {
    const fn = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen;
    if (fn) return fn.call(el).catch(() => { /* user gesture / permission — ignore */ });
  }, []);

  const exit = useCallback(() => {
    if (!getFsElement()) return;
    const fn = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
    if (fn) return fn.call(document).catch(() => {});
  }, []);

  const toggle = useCallback((el) => (getFsElement() ? exit() : enter(el)), [enter, exit]);

  return { isFullscreen, enter, exit, toggle };
}

function getFsElement() {
  if (typeof document === 'undefined') return null;
  return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || null;
}