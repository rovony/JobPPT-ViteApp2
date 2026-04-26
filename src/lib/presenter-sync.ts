/**
 * Cross-tab navigation sync for presenter mode.
 *
 * When the user clicks "Pop out", we open the deck in a new tab with
 * ?presenter=1. Both tabs share navigation state via BroadcastChannel
 * (with localStorage as a fallback). Each tab listens and applies goto().
 */
const CHANNEL = 'deck-presenter-sync';

export function makeChannel() {
  if (typeof window === 'undefined') return null;
  if ('BroadcastChannel' in window) return new BroadcastChannel(CHANNEL);
  return null;
}

/**
 * Broadcast a navigation event to other tabs of the same deck.
 */
export function broadcast(channel, deckId, payload) {
  const msg = { deckId, ...payload, ts: Date.now() };
  if (channel) channel.postMessage(msg);
  // localStorage fallback (same-origin tabs only)
  try {
    localStorage.setItem(`${CHANNEL}:${deckId}`, JSON.stringify(msg));
  } catch { /* quota / privacy mode — ignore */ }
}

/**
 * Subscribe to navigation events for a given deck. Returns an unsubscribe.
 */
export function subscribe(channel, deckId, handler) {
  const onMsg = (e) => {
    const data = e.data || e;
    if (data?.deckId === deckId) handler(data);
  };
  const onStorage = (e) => {
    if (e.key !== `${CHANNEL}:${deckId}` || !e.newValue) return;
    try { handler(JSON.parse(e.newValue)); } catch { /* ignore */ }
  };
  channel?.addEventListener('message', onMsg);
  window.addEventListener('storage', onStorage);
  return () => {
    channel?.removeEventListener('message', onMsg);
    window.removeEventListener('storage', onStorage);
  };
}