window.addEventListener('load', () => {
  document.getElementById('convert-button').addEventListener('click', async () => {
    background = await browser.runtime.getBackgroundPage();
    background.YouTube().convert();
    window.close();
  });
});