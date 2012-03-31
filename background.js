(function() {
  var sBookmark;

  sBookmark = this.sBookmark;

  this.openNewPage = function(url) {
    console.log("open new page: " + url);
    safari.application.activeBrowserWindow.openTab().url = url;
    return sBookmark.closePopovers();
  };

  safari.application.addEventListener("command", (function(event) {
    var browserWindow;
    if (event.command === "bookmark") {
      browserWindow = sBookmark.findActiveBrowserWindow(event);
      return browserWindow.activeTab.page.dispatchMessage("PageInfoRequest", "please");
    }
  }), false);

  safari.application.addEventListener("message", (function(event) {
    var data;
    data = event.message;
    if (event.name === "PageInfoResponse") {
      console.log("add bookmark: " + data.title + " - (" + data.href + ")");
      if (data.href && data.href !== "about:blank") {
        return sBookmark.insertBookmark(data.href, data.title);
      }
    } else {
      if (event.name === "OpenNewPage") return openNewPage(data);
    }
  }), false);

  sBookmark.initializeLocalStorage();

}).call(this);
