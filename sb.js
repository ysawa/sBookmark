(function() {

  this.SB = {
    closePopovers: function() {
      var i, popovers, _results;
      popovers = safari.extension.popovers;
      i = 0;
      _results = [];
      while (i < popovers.length) {
        popovers[i].hide();
        _results.push(i++);
      }
      return _results;
    },
    findActiveBrowserWindow: function(event) {
      var browserWindow, menuId;
      browserWindow = void 0;
      if (event.target.browserWindow) {
        browserWindow = event.target.browserWindow;
      } else if (event.target instanceof SafariExtensionMenuItem) {
        menuId = event.target.identifier.split(":")[0];
        browserWindow = windowByMenuId[menuId];
      } else {
        browserWindow = safari.application.activeBrowserWindow;
      }
      return browserWindow;
    },
    findBookmarks: function() {
      var bookmark, bookmarks, i;
      bookmarks = [];
      i = 0;
      while (i < this.getAutoIncrement()) {
        bookmark = getBookmark(i);
        bookmarks.push(bookmark);
        i++;
      }
      return bookmarks;
    },
    getAutoIncrement: function() {
      return parseInt(localStorage.auto_increment);
    },
    getBookmark: function(key) {
      var json, store_key;
      store_key = this.makeBookmarkKey(key);
      json = localStorage[store_key];
      if (json === undefined) {
        return undefined;
      } else {
        return JSON.parse(json);
      }
    },
    getCount: function() {
      return parseInt(localStorage.count);
    },
    incrementAutoIncrement: function() {
      localStorage.auto_increment = this.getAutoIncrement() + 1;
      return parseInt(localStorage.auto_increment);
    },
    incrementCount: function() {
      localStorage.count = this.getCount() + 1;
      return parseInt(localStorage.count);
    },
    initializeLocalStorage: function() {
      if (localStorage.count === undefined) this.setCount(0);
      if (localStorage.auto_increment === undefined) {
        return this.setAutoIncrement(0);
      }
    },
    insertBookmark: function(href, title) {
      var data, key;
      data = {};
      data.href = href;
      data.title = title;
      data.timestamp = parseInt((new Date) / 1000);
      key = this.getAutoIncrement();
      this.setBookmark(key, data);
      this.incrementAutoIncrement();
      this.incrementCount();
      return this.refreshPopovers();
    },
    makeBookmarkKey: function(key) {
      var store_key;
      store_key = "bookmark_" + key;
      return store_key;
    },
    refreshPopovers: function() {
      var i, popovers, _results;
      popovers = safari.extension.popovers;
      i = 0;
      _results = [];
      while (i < popovers.length) {
        popovers[i].contentWindow.location.reload();
        _results.push(i++);
      }
      return _results;
    },
    setAutoIncrement: function(value) {
      localStorage.auto_increment = value;
      return parseInt(localStorage.auto_increment);
    },
    setBookmark: function(key, value) {
      var store_key;
      store_key = this.makeBookmarkKey(key);
      localStorage[store_key] = JSON.stringify(value);
      return localStorage[store_key];
    },
    setCount: function(value) {
      localStorage.count = value;
      return parseInt(localStorage.count);
    },
    truncate: function(text, length) {}
  };

}).call(this);
