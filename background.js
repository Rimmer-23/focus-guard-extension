/**
 * Background Service Worker
 * Handles the focus timer alarm and manages the extension state in the background.
 */

// Listen for the alarm to trigger
chrome.alarms.onAlarm.addListener((alarm) => {
  // Check if it's our focus timer
  if (alarm.name === "focusTimer") {
    
    // Disable blocking and reset the timer in storage
    chrome.storage.local.set({ 
      enabled: false, 
      timerEndTime: null 
    });
  }
});

// Optional: Initialize default settings when extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(['blockedSites'], (result) => {
    // Only set defaults if they don't exist yet
    if (!result.blockedSites) {
      chrome.storage.local.set({
        blockedSites: ['youtube.com', 'vk.com', 'twitter.com'],
        enabled: false
      });
    }
  });
});