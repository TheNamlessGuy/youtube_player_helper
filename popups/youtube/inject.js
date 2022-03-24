actions({
  'get-ids': getIds,
  'setup-playlist': setupPlaylist,
});

function getIds(msg) {
  let ids = document.getElementById('contents').getElementsByClassName('yt-simple-endpoint style-scope ytd-playlist-video-renderer');
  ids = [].slice.call(ids);
  ids = ids.map(function(x) {
    return {
      id: new URL(x.href).searchParams.get('v'),
      title: x.innerText.trim(),
    };
  }).filter((x) => x.id != null);

  respondTo(msg, {ids: ids});
}

function setupPlaylist(msg) {
  sendEvent('setup-playlist', {ids: msg.ids});
  respondTo(msg);
}