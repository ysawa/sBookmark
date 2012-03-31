sBookmark = this.sBookmark
this.sBPOP =
  insertAllBookmarks: ->
    auto_increment = sBookmark.getAutoIncrement()

    i = auto_increment - 1
    while i >= 0
      bookmark = sBookmark.getBookmark(i)
      if bookmark is `undefined`
        i--
        continue
      @insertBookmark i, bookmark
      i--

  insertBookmark: (id, bookmark) ->
    html = "<li class=\"bookmark\" id=\"bookmark_" + id + "\">"
    html += "<a href=\"#\" class=\"delete\" title=\"削除する\">×</a>"
    html += "<a href=\"" + bookmark.href + "\" class=\"link\">"
    title = undefined
    if bookmark.title
      title = bookmark.title
    else
      title = bookmark.href
    html += sBookmark.truncate(title, 40)
    html += "</a></li>"
    document.getElementById("bookmarks").innerHTML += html

$("li.bookmark a.link").live "click", ->
  safari.extension.globalPage.contentWindow.openNewPage $(this).attr("href")
  false

$("li.bookmark a.delete").live "click", ->
  parent = $(this).parent("li.bookmark")
  sBookmark.deleteBookmark parent.attr("id").substr(9)
  parent.slideUp()
  false

$ ->
  sBPOP.insertAllBookmarks()
