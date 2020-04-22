function executeScriptFail(error) {
  console.log("Couldn't execute script", error);
}

window.addEventListener('load', () => {
  document.getElementById('slice-button').addEventListener('click', () => {
    let slice_start = parseInt(document.getElementById('slice-start').value, 10);
    let slice_end = parseInt(document.getElementById('slice-end').value, 10);

    if (slice_start > slice_end) {
      console.log('slice_start (' + slice_start + ') is greater than slice_end (' + slice_end + ')');
      return;
    }

    browser.tabs.executeScript({
      code: "let SLICE_START_INDEX = " + slice_start + "; let SLICE_END_INDEX = " + slice_end + ";"
    }).catch(executeScriptFail);

    browser.tabs.executeScript({ file: "inject.js" }).catch(executeScriptFail);
  });
});