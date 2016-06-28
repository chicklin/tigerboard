// Keep list of tabs outside of request callback
var tabs = {};

// Get all existing tabs
chrome.tabs.query({}, function(results) {
    results.forEach(function(tab) {
        tabs[tab.id] = tab;
    });
});

// Create tab event listeners
function onUpdatedListener(tabId, changeInfo, tab) {
    tabs[tab.id] = tab;
}
function onRemovedListener(tabId) {
    delete tabs[tabId];
}

// Subscribe to tab events
chrome.tabs.onUpdated.addListener(onUpdatedListener);
chrome.tabs.onRemoved.addListener(onRemovedListener);


// block loading of imgur.com .gifs
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    // check current tab
    var tab = tabs[details.tabId];
    if(tab.url.match('.*tigerboard.com.*')) {
      console.log('Blocking loading of imgur.com .gif, will replace with HTML5 video/gifv');
      console.log(details);
      return { cancel: true };
    }
  },
  { urls: ["*://*.imgur.com/*.gif","*://imgur.com/*.gif"], types: ["image"] },
  ["blocking"]
);


// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // That fires when a page's URL contains a 'g' ...
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'tigerboard.com' },
          })
        ],
        // And shows the extension's page action.
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});
