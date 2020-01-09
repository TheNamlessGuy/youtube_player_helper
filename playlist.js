(function() {
  function getVideoID(elem) {
    let href = elem.getAttribute('href');
    if (href == null || !href.startsWith('/watch') || elem.id == 'thumbnail') {
      return null;
    }

    href = href.substring(href.indexOf('?v=') + 3);
    return href.substring(0, href.indexOf('&'));
  }

  let contents = document.getElementById('contents');
  let videos = contents.getElementsByClassName('yt-simple-endpoint');

  let ids = [];
  for (let v = 0; v < videos.length; ++v) {
    let id = getVideoID(videos[v]);
    if (id != null) {
      ids.push(id);
    }
  }

  let url = new URL("https://thenamlessguy.github.io/youtube_player/");
  url.searchParams.set('v', ids.join(':'));
  window.location.href = url.href;
})();
