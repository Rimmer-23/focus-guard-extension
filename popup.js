<<<<<<< HEAD
/**
 * Focus Guard - Popup Logic
 * Handles UI interactions, timer setup, and settings management.
 */

const checkbox = document.getElementById('toggleBlock');
const statusText = document.getElementById('status');
const startBtn = document.getElementById('startTimer');
const stopBtn = document.getElementById('stopTimer');
const minutesInput = document.getElementById('minutesInput');
const setupDiv = document.getElementById('setupDiv');
const countdownDiv = document.getElementById('countdownDiv');
const timerDisplay = document.getElementById('timerDisplay');

let countdownInterval;

// --- 1. Initialization (Restore state on popup open) ---
chrome.storage.local.get(['enabled', 'timerEndTime'], (result) => {
  const isEnabled = result.enabled || false;
  checkbox.checked = isEnabled;
  updateStatusUI(isEnabled);

  // If the timer was running and hasn't expired yet, restore the countdown
  if (result.timerEndTime && result.timerEndTime > Date.now()) {
    showTimerUI();
    startCountdownTicker(result.timerEndTime);
  }
});

// --- 2. Manual Toggle Logic ---
checkbox.addEventListener('change', () => {
  const isEnabled = checkbox.checked;
  
  // If manually enabled, reset the timer to avoid conflicts
  if (isEnabled) {
    stopTimerLogic(); 
  }
  saveState(isEnabled);
});

// --- 3. Timer Controls Logic ---
startBtn.addEventListener('click', () => {
  const mins = parseInt(minutesInput.value);
  if (!mins) return;

  // Calculate end time (current time + N minutes)
  const endTime = Date.now() + (mins * 60 * 1000);

  // 1. Create a system alarm (runs in background even if popup is closed)
  chrome.alarms.create("focusTimer", { when: endTime });

  // 2. Persist the end time to storage
  chrome.storage.local.set({ timerEndTime: endTime });

  // 3. Enable blocking immediately
  checkbox.checked = true;
  saveState(true);

  // 4. Update UI to show countdown
  showTimerUI();
  startCountdownTicker(endTime);
});

stopBtn.addEventListener('click', () => {
  stopTimerLogic();
  // Disable blocking when manually stopped
  checkbox.checked = false;
  saveState(false);
});

// --- Helper Functions ---

function saveState(isEnabled) {
  chrome.storage.local.set({ enabled: isEnabled });
  updateStatusUI(isEnabled);
}

function updateStatusUI(active) {
  statusText.innerText = active ? "⛔ Blocking Active" : "✅ Relax Mode";
  statusText.style.color = active ? "#d9534f" : "#5cb85c";
}

function showTimerUI() {
  setupDiv.style.display = 'none';
  countdownDiv.style.display = 'block';
}

function showSetupUI() {
  setupDiv.style.display = 'block';
  countdownDiv.style.display = 'none';
}

function stopTimerLogic() {
  chrome.alarms.clear("focusTimer"); // Clear the system alarm
  chrome.storage.local.set({ timerEndTime: null }); // Remove end time from storage
  clearInterval(countdownInterval); // Stop the UI ticker
  showSetupUI();
}

// Countdown ticker to update the display every second
function startCountdownTicker(endTime) {
  // Update immediately to avoid 1-second delay
  updateDisplay(); 

  countdownInterval = setInterval(updateDisplay, 1000);

  function updateDisplay() {
    const timeLeft = endTime - Date.now();
    
    if (timeLeft <= 0) {
      // Time is up. The background worker handles the logic, 
      // but we update UI here for immediate feedback if popup is open.
      stopTimerLogic();
      checkbox.checked = false;
      updateStatusUI(false);
      return;
    }

    const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);
    
    timerDisplay.innerText = 
      `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}

// --- 4. Blocked Sites Management ---

const siteListTextarea = document.getElementById('siteList');
const saveSitesBtn = document.getElementById('saveSites');

// Load saved sites when popup opens
chrome.storage.local.get(['blockedSites'], (result) => {
  // If we have a list, join it with commas to show in textarea
  if (result.blockedSites) {
    siteListTextarea.value = result.blockedSites.join(', ');
  }
});

// Save the list when button is clicked
saveSitesBtn.addEventListener('click', () => {
  const rawInput = siteListTextarea.value;
  
  // Split string by comma, remove whitespace, and filter out empty strings
  const sitesArray = rawInput.split(',')
    .map(site => site.trim())
    .filter(site => site.length > 0);

  // Save to Chrome Storage
  chrome.storage.local.set({ blockedSites: sitesArray }, () => {
    // Visual feedback for the user
    const originalText = saveSitesBtn.innerText;
    saveSitesBtn.innerText = "Saved!";
    setTimeout(() => {
      saveSitesBtn.innerText = originalText;
    }, 1500);
  });
=======
/**
 * Focus Guard - Popup Logic
 * Handles UI interactions, timer setup, and settings management.
 */

const checkbox = document.getElementById('toggleBlock');
const statusText = document.getElementById('status');
const startBtn = document.getElementById('startTimer');
const stopBtn = document.getElementById('stopTimer');
const minutesInput = document.getElementById('minutesInput');
const setupDiv = document.getElementById('setupDiv');
const countdownDiv = document.getElementById('countdownDiv');
const timerDisplay = document.getElementById('timerDisplay');

let countdownInterval;

// --- 1. Initialization (Restore state on popup open) ---
chrome.storage.local.get(['enabled', 'timerEndTime'], (result) => {
  const isEnabled = result.enabled || false;
  checkbox.checked = isEnabled;
  updateStatusUI(isEnabled);

  // If the timer was running and hasn't expired yet, restore the countdown
  if (result.timerEndTime && result.timerEndTime > Date.now()) {
    showTimerUI();
    startCountdownTicker(result.timerEndTime);
  }
});

// --- 2. Manual Toggle Logic ---
checkbox.addEventListener('change', () => {
  const isEnabled = checkbox.checked;
  
  // If manually enabled, reset the timer to avoid conflicts
  if (isEnabled) {
    stopTimerLogic(); 
  }
  saveState(isEnabled);
});

// --- 3. Timer Controls Logic ---
startBtn.addEventListener('click', () => {
  const mins = parseInt(minutesInput.value);
  if (!mins) return;

  // Calculate end time (current time + N minutes)
  const endTime = Date.now() + (mins * 60 * 1000);

  // 1. Create a system alarm (runs in background even if popup is closed)
  chrome.alarms.create("focusTimer", { when: endTime });

  // 2. Persist the end time to storage
  chrome.storage.local.set({ timerEndTime: endTime });

  // 3. Enable blocking immediately
  checkbox.checked = true;
  saveState(true);

  // 4. Update UI to show countdown
  showTimerUI();
  startCountdownTicker(endTime);
});

stopBtn.addEventListener('click', () => {
  stopTimerLogic();
  // Disable blocking when manually stopped
  checkbox.checked = false;
  saveState(false);
});

// --- Helper Functions ---

function saveState(isEnabled) {
  chrome.storage.local.set({ enabled: isEnabled });
  updateStatusUI(isEnabled);
}

function updateStatusUI(active) {
  statusText.innerText = active ? "⛔ Blocking Active" : "✅ Relax Mode";
  statusText.style.color = active ? "#d9534f" : "#5cb85c";
}

function showTimerUI() {
  setupDiv.style.display = 'none';
  countdownDiv.style.display = 'block';
}

function showSetupUI() {
  setupDiv.style.display = 'block';
  countdownDiv.style.display = 'none';
}

function stopTimerLogic() {
  chrome.alarms.clear("focusTimer"); // Clear the system alarm
  chrome.storage.local.set({ timerEndTime: null }); // Remove end time from storage
  clearInterval(countdownInterval); // Stop the UI ticker
  showSetupUI();
}

// Countdown ticker to update the display every second
function startCountdownTicker(endTime) {
  // Update immediately to avoid 1-second delay
  updateDisplay(); 

  countdownInterval = setInterval(updateDisplay, 1000);

  function updateDisplay() {
    const timeLeft = endTime - Date.now();
    
    if (timeLeft <= 0) {
      // Time is up. The background worker handles the logic, 
      // but we update UI here for immediate feedback if popup is open.
      stopTimerLogic();
      checkbox.checked = false;
      updateStatusUI(false);
      return;
    }

    const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);
    
    timerDisplay.innerText = 
      `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}

// --- 4. Blocked Sites Management ---

const siteListTextarea = document.getElementById('siteList');
const saveSitesBtn = document.getElementById('saveSites');

// Load saved sites when popup opens
chrome.storage.local.get(['blockedSites'], (result) => {
  // If we have a list, join it with commas to show in textarea
  if (result.blockedSites) {
    siteListTextarea.value = result.blockedSites.join(', ');
  }
});

// Save the list when button is clicked
saveSitesBtn.addEventListener('click', () => {
  const rawInput = siteListTextarea.value;
  
  // Split string by comma, remove whitespace, and filter out empty strings
  const sitesArray = rawInput.split(',')
    .map(site => site.trim())
    .filter(site => site.length > 0);

  // Save to Chrome Storage
  chrome.storage.local.set({ blockedSites: sitesArray }, () => {
    // Visual feedback for the user
    const originalText = saveSitesBtn.innerText;
    saveSitesBtn.innerText = "Saved!";
    setTimeout(() => {
      saveSitesBtn.innerText = originalText;
    }, 1500);
  });
>>>>>>> 91d874aaab79ef4e4fb789caa12a45371aff45fe
});