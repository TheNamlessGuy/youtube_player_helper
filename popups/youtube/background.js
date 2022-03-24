const _YouTube = {
  regex: /.*:\/\/.*.youtube.com\/playlist.*/g,
  inject: '/popups/youtube/inject.js',
  index: '/popups/youtube/index.html',

  convert: async function() {
    const tab = await Helpers.getCurrentTab();
    await Helpers.inject(tab.id, this.inject);
    let port = await Helpers.connect(tab.id);
    const msg = await Helpers.eject(port, 'get-ids');

    await Helpers.redirect(tab.id, Helpers.YOUTUBE_PLAYER_URL);

    await Helpers.inject(tab.id, this.inject);
    port = await Helpers.connect(tab.id);
    await Helpers.eject(port, 'setup-playlist', {ids: msg.ids});
  },
};
function YouTube() { return _YouTube; }