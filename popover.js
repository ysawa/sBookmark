(function() {
  var sBookmark;

  sBookmark = this.sBookmark;

  this.sBPOP = {
    insertAllBookmarks: function() {
      var auto_increment, bookmark, i, _results;
      auto_increment = sBookmark.getAutoIncrement();
      i = auto_increment - 1;
      _results = [];
      while (i >= 0) {
        bookmark = sBookmark.getBookmark(i);
        if (bookmark === undefined) {
          i--;
          continue;
        }
        this.insertBookmark(i, bookmark);
        _results.push(i--);
      }
      return _results;
    },
    insertBookmark: function(id, bookmark) {
      var html, title;
      html = "<li class=\"bookmark\" id=\"bookmark_" + id + "\">";
      html += "<a href=\"#\" class=\"delete\">×</a>";
      html += "<a href=\"" + bookmark.href + "\" class=\"link\">";
      title = void 0;
      if (bookmark.title) {
        title = bookmark.title;
      } else {
        title = bookmark.href;
      }
      html += sBookmark.truncate(title, 40);
      html += "</a></li>";
      return document.getElementById("bookmarks").innerHTML += html;
    }
  };

  $("li.bookmark a.link").live("click", function() {
    safari.extension.globalPage.contentWindow.openNewPage($(this).attr("href"));
    return false;
  });

  $("li.bookmark a.delete").live("click", function() {
    var parent;
    parent = $(this).parent("li.bookmark");
    sBookmark.deleteBookmark(parent.attr("id").substr(9));
    parent.slideUp();
    return false;
  });

  $(function() {
    return sBPOP.insertAllBookmarks();
  });

}).call(this);
