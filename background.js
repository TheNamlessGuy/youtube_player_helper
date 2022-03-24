const background = {
  popups: [
    YouTube(),
  ],

  onPageActionClicked: function(tab) {
    for (const popup of this.popups) {
      if (tab.url.match(popup.regex)) {
        browser.pageAction.setPopup({tabId: tab.id, popup: popup.index});
        browser.pageAction.openPopup();
        browser.pageAction.setPopup({tabId: tab.id, popup: ''});
        break;
      }
    }
  },

  onTabUpdated: async function(tabID, changeInfo, tabInfo) {
    if (!changeInfo.url) { return; }

    const isShown = await browser.pageAction.isShown({tabId: tabID});

    let shouldBeShown = false;
    for (const popup of this.popups) {
      if (changeInfo.url.match(popup.regex)) {
        shouldBeShown = true;
        break;
      }
    }

    if (shouldBeShown && !isShown) {
      browser.pageAction.show(tabID);
    } else if (!shouldBeShown && isShown) {
      browser.pageAction.hide(tabID);
    }
  },

  setup: function() {
    browser.pageAction.onClicked.addListener(this.onPageActionClicked.bind(this));
    browser.tabs.onUpdated.addListener(this.onTabUpdated.bind(this));
  },
}
background.setup();