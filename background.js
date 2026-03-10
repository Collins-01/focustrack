// FocusTrack background service worker
const STORE_KEY = 'focustrack_v1';
const ALARM_NAME = 'focusTimer';

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'START_TIMER') {
    startBackgroundTimer(msg.timerLeft);
    sendResponse({ ok: true });
  }
  if (msg.type === 'STOP_TIMER' || msg.type === 'RESET_TIMER') {
    stopBackgroundTimer();
    sendResponse({ ok: true });
  }
  return true;
});

async function startBackgroundTimer(timerLeft) {
  // Clear any existing alarm
  await chrome.alarms.clear(ALARM_NAME);

  if (timerLeft <= 0) return;

  // Calculate when the timer should end
  const endTime = Date.now() + (timerLeft * 1000);

  // Store the endTime so other parts of the app can calculate remaining time
  const res = await chrome.storage.local.get([STORE_KEY]);
  const state = res[STORE_KEY] ? JSON.parse(res[STORE_KEY]) : {};
  state.timerEndTime = endTime;
  state.timerRunning = true;
  await chrome.storage.local.set({ [STORE_KEY]: JSON.stringify(state) });

  // Create an alarm to fire when time is up
  // Alarms are reliable even if the service worker goes to sleep
  chrome.alarms.create(ALARM_NAME, { when: endTime });
}

async function stopBackgroundTimer() {
  await chrome.alarms.clear(ALARM_NAME);

  const res = await chrome.storage.local.get([STORE_KEY]);
  const state = res[STORE_KEY] ? JSON.parse(res[STORE_KEY]) : {};
  state.timerRunning = false;
  state.timerEndTime = null;
  await chrome.storage.local.set({ [STORE_KEY]: JSON.stringify(state) });
}

// Listen for the alarm
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === ALARM_NAME) {
    showNotification();

    // Update state
    const res = await chrome.storage.local.get([STORE_KEY]);
    const state = res[STORE_KEY] ? JSON.parse(res[STORE_KEY]) : {};
    state.timerRunning = false;
    state.timerLeft = 0;
    state.timerEndTime = null;
    await chrome.storage.local.set({ [STORE_KEY]: JSON.stringify(state) });
  }
});

function showNotification() {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icons/icon128.png',
    title: 'FocusTrack',
    message: 'Time is up! Your focus session has ended.',
    priority: 2
  });
}
