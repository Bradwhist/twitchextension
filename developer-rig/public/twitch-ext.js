(function(ext) {
  var twitch = window.Twitch = window.Twitch || {};
  twitch.ext = Object.assign(twitch.ext || {}, ext);
})(function() {
  let authCallback, authData;
  let contextCallback, context, contextChangedFields;
  let isVisible, visibilityCallback;
  let positionCallback;
  let followCallback;
  let listeners = {};
  let webSocket;

  window.addEventListener("message", event => {
    if (event.data) {
      switch (event.data.action) {
        case "extension-frame-authorize-response":
          webSocket = new WebSocket("wss://localhost.rig.twitch.tv:3003");
          webSocket.addEventListener('message', function(event) {
            let message = JSON.parse(event.data);
            if (message.type === 'MESSAGE') {
              const [channelId, clientId, target] = message.data.topic.split('.').pop().split('-');
              if (authData.channelId === channelId && authData.clientId === clientId) {
                const targetListeners = listeners[target];
                if (targetListeners) {
                  message = JSON.parse(message.data.message);
                  targetListeners.forEach(fn => {
                    fn(target, message.content_type, message.content[0]);
                  });
                }
              }
            }
          });
          authData = Object.assign({}, event.data.response);
          authCallback(authData);
          break;
        case 'twitch-ext-context':
          contextCallback(event.data.context);
          break;
        case 'twitch-ext-auth':
          authCallback(event.data.auth);
          break;
        default:
          break;
      }
    }
  });

  return {
    version: "0.0.0",
    onAuthorized: fn => {
      authCallback = fn;
      if (authData) {
        authCallback(authData);
      } else {
        window.parent.postMessage({ action: "extension-frame-authorize" }, '*');
      }
    },
    onError: fn => {
      errCallback = fn;
    },
    onContext: fn => {
      contextCallback = fn;
      context && contextCallback(context, contextChangedFields);
      setTimeout(() => {
        contextCallback({ "mode": "viewer", "language": "en", "theme": "light", "game": "", "playbackMode": "video" },
          ["mode", "language", "theme", "game", "playbackMode"]);
      });
    },
    onVisibilityChanged: fn => {
      visibilityCallback = fn;
      isVisible || visibilityCallback(false, null);
    },
    onPositionChange: fn => {
      positionCallback = fn;
    },
    send: (target, contentType, message) => {
      window.parent.parent.postMessage({ action: "extension-frame-pubsub", channelId: authData.channelId, target, contentType, message }, '*');
    },
    listen: (target, callback) => {
      let targetListeners = listeners[target];
      if (!targetListeners) {
        listeners[target] = [callback];
      } else if (!~targetListeners.indexOf(callback)) {
        targetListeners.push(callback);
      }
    },
    unlisten: (target, callback) => {
      let targetListeners = listeners[target];
      if (!targetListeners) {
        return;
      }
      let index = targetListeners.indexOf(callback);
      if (~index) {
        if (targetListeners.length === 1) {
          delete listeners[target];
        } else {
          targetListeners.splice(index, 1);
        }
      }
    },
    actions: {
      followChannel: channelName => {
        if (typeof followCallback === 'function') {
          setTimeout(() => followCallback(true, channelName), 11);
        }
      },
      onFollow: callback => {
        followCallback = callback;
      },
      requestIdShare: () => {
        if (typeof authCallback === 'function') {
          setTimeout(() => {
            authData.userId = '111111111';
            authCallback(authData);
          }, 11);
        }
      },
    },
    rig: {
      log: (message, ...optionalParams) => {
        window.parent.parent.postMessage({
          action: 'twitch-ext-rig-log',
          messages: [message, ...optionalParams],
        }, '*');
      }
    },
  };
}());
