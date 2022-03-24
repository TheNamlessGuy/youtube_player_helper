let _actions = {};
let _port = null;
let _connectionListener = null;
let _messageListener = null;

_connectionListener = (port) => {
  _port = port;

  _messageListener = (msg) => {
    if (msg.action in _actions) {
      _actions[msg.action](msg);
    }

    if (msg._eject ?? false) {
      _port.onMessage.removeListener(_messageListener);
      browser.runtime.onConnect.removeListener(_connectionListener);
    }
  };
  _port.onMessage.addListener(_messageListener);
};
browser.runtime.onConnect.addListener(_connectionListener);

function actions(actions) {
  _actions = actions;
}

function respondTo(msg, data = {}) {
  _port.postMessage({
    response: msg.action,
    ...data,
  });
}

function sendEvent(action, data = {}) {
  data.action = action;
  const event = new CustomEvent('youtube-player-helper', {detail: JSON.stringify(data), bubbles: true});
  document.dispatchEvent(event);
}