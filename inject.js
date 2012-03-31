(function() {

  if (window.top === window) {
    safari.self.addEventListener("message", (function(event) {
      var data;
      if (location.href.match(/safari-extension:\/\//)) return;
      console.log(event.name);
      if (event.name === "PageInfoRequest") {
        data = {};
        data["href"] = location.href;
        data["title"] = document.title;
        return safari.self.tab.dispatchMessage("PageInfoResponse", data);
      }
    }), false);
  }

}).call(this);
