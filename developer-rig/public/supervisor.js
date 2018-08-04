(function() {
  const SupervisorReady = "supervisor-ready", SupervisorInit = "supervisor-init";
  const rx = /https:\/\/(?:[^\.]+\.)*?twitch\.(tv|tech)/;
  const protocols = {
    "http": "80",
    "https": "443",
  };

  document.addEventListener("DOMContentLoaded", function() {
    parent.postMessage({ action: SupervisorReady }, "*");
    document.body.setAttribute("tabindex", "-1");
    document.documentElement.setAttribute("style", "height: 100%; width: 100%;");
  });
  window.addEventListener("message", checkInitialize);

  function checkInitialize(message) {
    const data = message.data;
    if (message.source === parent && message.origin.match(rx) && data.action === SupervisorInit) {
      initialize(data.options);
      window.removeEventListener("message", checkInitialize);
    }
  }

  function initialize({ extensionURL, hostOrigin, iframeAttrs }) {
    const meta = document.createElement("meta");
    meta.httpEquiv = "Content-Security-Policy";
    const extensionOrigin = getExtensionOrigin(extensionURL);
    meta.content = "frame-src 'self' " + extensionOrigin;
    document.head.appendChild(meta);
    const iframe = document.createElement("iframe");
    iframe.setAttribute("src", extensionURL);
    iframe.setAttribute("frameBorder", "0");
    document.body.appendChild(iframe);
    iframe.setAttribute("style", iframeAttrs.style || "width: 100%; height: 100%");
    iframe.setAttribute("scrolling", iframeAttrs.scrolling || "yes");
    iframe.setAttribute("sandbox", iframeAttrs.sandbox || "allow-scripts allow-forms");
    iframe.style.width = "100%";
    window.addEventListener("message", handleAction);

    function getExtensionOrigin(url) {
      const a = document.createElement("a");
      a.setAttribute("href", url);
      const protocol = a.protocol.slice(0, -1);
      let extensionOrigin = a.protocol + "//" + a.hostname;
      if (a.port && a.port !== protocols[protocol]) {
        extensionOrigin += ":" + a.port;
      }
      return extensionOrigin;
    }

    function handleAction(message) {
      const { source, data, origin } = message;
      if (source === iframe.contentWindow && origin === extensionOrigin) {
        parent.postMessage(data, hostOrigin);
      } else if (source === parent && origin.match(rx)) {
        iframe.contentWindow.postMessage(data, extensionOrigin);
      } else {
        console.error("Got message from unexpected source", origin, JSON.stringify(data));
      }
    }
  }
})();
