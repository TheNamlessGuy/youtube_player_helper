const Helpers = {
  _BASE_INJECT: '/inject.js',
  YOUTUBE_PLAYER_URL: 'https://thenamlessguy.github.io/youtube_player/',

  getCurrentTab: async function() {
    return (await browser.tabs.query({currentWindow: true, active: true}))[0];
  },

  inject: async function(tabID, file) {
    await browser.tabs.executeScript(tabID, {file: this._BASE_INJECT}).catch(() => {});
    await browser.tabs.executeScript(tabID, {file: file});
  },

  connect: async function(tabID) {
    return await browser.tabs.connect(tabID);
  },

  genericOneMessageListener: function(port, action, message = {}) {
    message = {...{action: action}, ...message};

    return new Promise((resolve) => {
      const listener = async (msg) => {
        port.onMessage.removeListener(listener);
        resolve(msg);
      };

      port.onMessage.addListener(listener);
      port.postMessage(message);
    });
  },

  action: async function(port, action, msg = {}) {
    try {
      return await this.genericOneMessageListener(port, action, msg);
    } catch (e) {
      console.error('Error while posting action message', msg, 'on port', port, '=>', e);
      return null;
    }
  },

  eject: async function(port, action = null, msg = {}) {
    try {
      return await this.genericOneMessageListener(port, action, {_eject: true, ...msg});
    } catch (e) {
      console.error('Error while posting eject message', msg, 'on port', port, '=>', e);
      return null;
    }
  },

  tabFinishLoading: function(tabID) {
    return new Promise((resolve) => {
      const listener = (changedTabId, changeInfo, newTab) => {
        if (changedTabId === tabID && changeInfo.status === 'complete') {
          browser.tabs.onUpdated.removeListener(listener);
          resolve({changeInfo, newTab});
        }
      };

      browser.tabs.onUpdated.addListener(listener, {properties: ['status'], tabId: tabID});
    });
  },

  redirect: async function(tabID, url) {
    await browser.tabs.update(tabID, {url: url});
    await this.tabFinishLoading(tabID);
  },
};