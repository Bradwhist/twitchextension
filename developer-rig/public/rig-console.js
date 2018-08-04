const MAX_HISTORY_SIZE = 500;

window.rig = {};
window.rig.history = [];
window.rig.log = (log, frame) => {
  if (!frame) {
    frame = 'window';
  }

  window.rig.history.push({
    log: log,
    frame: frame
  });
  window.rig.history = window.rig.history.slice(-MAX_HISTORY_SIZE);
  window.rig.update(log, frame);
}

window.addEventListener('message', e => {
  if (e.data.action === 'twitch-ext-rig-log') {
    const frames = document.getElementsByClassName('rig-frame');
    let frame;
    for (let i = 0; i < frames.length; i++) {
      if (frames[i].contentWindow === e.source) {
        frame = frames[i];
        break;
      }
    }
    if (frame) {
      const frameId = frame.title;
      e.data.messages.forEach(message => {
        if (message instanceof Object) {
          message = JSON.stringify(message);
        }
        window.rig.log(message, frameId);
      });
    } else {
      console.log('message received from unknown source');
    }
  }
});
