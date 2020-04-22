function onBrowserActionClicked(tab) {
  if (tab.url.match(/.*:\/\/.*.youtube.com\/playlist.*/g)) {
    browser.browserAction.setPopup({ popup: '/popups/youtube/index.html' });
    browser.browserAction.openPopup();
    browser.browserAction.setPopup({ popup: '' });
  } else if (tab.url.match(/.*:\/\/thenamlessguy.github.io\/youtube_player.*/g)) {
    browser.browserAction.setPopup({ popup: '/popups/youtube_player/index.html' });
    browser.browserAction.openPopup();
    browser.browserAction.setPopup({ popup: '' });
  }
}

browser.browserAction.onClicked.addListener(onBrowserActionClicked);