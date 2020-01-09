function executeScriptFail() {
  console.log("Couldn't execute script");
}

function onBrowserActionClicked(tab) {
  if (tab.url.match(/.*:\/\/.*.youtube.com\/playlist.*/g)) {
    browser.tabs.executeScript({ file: "playlist.js" }).catch(executeScriptFail);
  }
}

browser.browserAction.onClicked.addListener(onBrowserActionClicked);