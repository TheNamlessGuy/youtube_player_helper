function executeScriptFail(error) {
  console.log("Couldn't execute script", error);
}

window.addEventListener('load', () => {
  document.getElementById('convert-button').addEventListener('click', () => {
    browser.tabs.executeScript({ file: "inject.js" }).catch(executeScriptFail);
  });
});