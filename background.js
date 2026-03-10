// FocusTrack background service worker
// Keeps timer state alive even when popup is closed

let timerInterval = null;

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'START_TIMER') {
    startBackgroundTimer(msg.timerLeft);
    sendResponse({ ok: true });
  }
  if (msg.type === 'STOP_TIMER') {
    stopBackgroundTimer();
    sendResponse({ ok: true });
  }
  if (msg.type === 'GET_STATE') {
    chrome.storage.local.get(['focustrack_v1'], (res) => {
      sendResponse({ data: res.focustrack_v1 || null });
    });
    return true; // async
  }
  return true;
});

function startBackgroundTimer(initialLeft) {
  stopBackgroundTimer();
  let timerLeft = initialLeft;

  timerInterval = setInterval(async () => {
    if (timerLeft <= 0) {
      stopBackgroundTimer();
      // Notify if possible
      return;
    }
    timerLeft--;

    // Update storage with new timerLeft
    const res = await chrome.storage.local.get(['focustrack_v1']);
    const state = res.focustrack_v1 ? JSON.parse(res.focustrack_v1) : null;
    if (state) {
      state.timerLeft = timerLeft;
      state.timerRunning = timerLeft > 0;
      await chrome.storage.local.set({ focustrack_v1: JSON.stringify(state) });
    }
  }, 1000);
}

function stopBackgroundTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}
