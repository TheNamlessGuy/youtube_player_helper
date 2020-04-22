(function() {
  let containers = document.getElementsByClassName('video-container');
  let keep = [];
  for (let i = 0; i < containers.length; ++i) {
    let index = parseInt(containers[i].getElementsByClassName('video-index')[0].innerText.substr(1), 10);
    if (index >= SLICE_START_INDEX && index <= SLICE_END_INDEX) {
      keep.push(containers[i].getElementsByClassName('video')[0].value);
    }
  }

  let url = new URL("https://thenamlessguy.github.io/youtube_player/");
  url.searchParams.set('v', keep.join(':'));
  window.location.href = url.href;
})();