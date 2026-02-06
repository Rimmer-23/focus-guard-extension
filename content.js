<<<<<<< HEAD
/**
 * Focus Guard - Content Script
 * Checks if the current website is in the user's blacklist and blocks it.
 */

const CURRENT_HOSTNAME = window.location.hostname;

// 1. Check status immediately on page load
chrome.storage.local.get(['enabled', 'blockedSites'], (result) => {
  const isEnabled = result.enabled || false;
  const blockedSites = result.blockedSites || [];

  if (isEnabled && isSiteBlocked(blockedSites)) {
    enableBlocker();
  }
});

// 2. Listen for realtime updates from Popup or Background worker
chrome.storage.onChanged.addListener((changes) => {
  // Retrieve latest data to verify blocking conditions
  chrome.storage.local.get(['enabled', 'blockedSites'], (result) => {
    const isEnabled = result.enabled || false;
    const blockedSites = result.blockedSites || [];

    // If extension is ON and site is in blacklist -> Block
    if (isEnabled && isSiteBlocked(blockedSites)) {
      enableBlocker();
    } else {
      // Otherwise -> Unblock (remove overlay if exists)
      disableBlocker();
    }
  });
});

/**
 * Helper function to check if current hostname matches any blocked domain
 * @param {string[]} siteList - Array of domains to block (e.g. ['youtube.com'])
 * @returns {boolean}
 */
function isSiteBlocked(siteList) {
  return siteList.some(site => CURRENT_HOSTNAME.includes(site));
}

/**
 * Creates and injects the blocking overlay
 */
function enableBlocker() {
  if (document.getElementById('focus-guard-overlay')) return;

  const overlay = document.createElement('div');
  overlay.id = 'focus-guard-overlay';
  
  // Apply styles for the glassmorphism effect
  overlay.style.cssText = `
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background-color: rgba(20, 20, 20, 0.96);
    backdrop-filter: blur(10px);
    z-index: 2147483647; /* Max Z-index to cover everything */
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: sans-serif;
    color: white;
  `;

  overlay.innerHTML = `
    <div style="text-align: center;">
      <div style="font-size: 80px; margin-bottom: 20px;">🛡️</div>
      <h1 style="margin: 0; font-size: 32px;">Focus Mode Active</h1>
      <p style="color: #aaa; margin-top: 10px;">
        Site: <span style="color: #fff;">${CURRENT_HOSTNAME}</span> is blocked.
      </p>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden'; // Disable scrolling
}

/**
 * Removes the blocking overlay
 */
function disableBlocker() {
  const overlay = document.getElementById('focus-guard-overlay');
  if (overlay) {
    overlay.remove();
    document.body.style.overflow = ''; // Restore scrolling
  }
=======
/**
 * Focus Guard - Content Script
 * Checks if the current website is in the user's blacklist and blocks it.
 */

const CURRENT_HOSTNAME = window.location.hostname;

// 1. Check status immediately on page load
chrome.storage.local.get(['enabled', 'blockedSites'], (result) => {
  const isEnabled = result.enabled || false;
  const blockedSites = result.blockedSites || [];

  if (isEnabled && isSiteBlocked(blockedSites)) {
    enableBlocker();
  }
});

// 2. Listen for realtime updates from Popup or Background worker
chrome.storage.onChanged.addListener((changes) => {
  // Retrieve latest data to verify blocking conditions
  chrome.storage.local.get(['enabled', 'blockedSites'], (result) => {
    const isEnabled = result.enabled || false;
    const blockedSites = result.blockedSites || [];

    // If extension is ON and site is in blacklist -> Block
    if (isEnabled && isSiteBlocked(blockedSites)) {
      enableBlocker();
    } else {
      // Otherwise -> Unblock (remove overlay if exists)
      disableBlocker();
    }
  });
});

/**
 * Helper function to check if current hostname matches any blocked domain
 * @param {string[]} siteList - Array of domains to block (e.g. ['youtube.com'])
 * @returns {boolean}
 */
function isSiteBlocked(siteList) {
  return siteList.some(site => CURRENT_HOSTNAME.includes(site));
}

/**
 * Creates and injects the blocking overlay
 */
function enableBlocker() {
  if (document.getElementById('focus-guard-overlay')) return;

  const overlay = document.createElement('div');
  overlay.id = 'focus-guard-overlay';
  
  // Apply styles for the glassmorphism effect
  overlay.style.cssText = `
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background-color: rgba(20, 20, 20, 0.96);
    backdrop-filter: blur(10px);
    z-index: 2147483647; /* Max Z-index to cover everything */
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: sans-serif;
    color: white;
  `;

  overlay.innerHTML = `
    <div style="text-align: center;">
      <div style="font-size: 80px; margin-bottom: 20px;">🛡️</div>
      <h1 style="margin: 0; font-size: 32px;">Focus Mode Active</h1>
      <p style="color: #aaa; margin-top: 10px;">
        Site: <span style="color: #fff;">${CURRENT_HOSTNAME}</span> is blocked.
      </p>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden'; // Disable scrolling
}

/**
 * Removes the blocking overlay
 */
function disableBlocker() {
  const overlay = document.getElementById('focus-guard-overlay');
  if (overlay) {
    overlay.remove();
    document.body.style.overflow = ''; // Restore scrolling
  }
>>>>>>> 91d874aaab79ef4e4fb789caa12a45371aff45fe
}