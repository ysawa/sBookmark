sBookmark = this.sBookmark

this.openNewPage = (url) ->
  console.log "open new page: " + url
  safari.application.activeBrowserWindow.openTab().url = url
  sBookmark.closePopovers()

safari.application.addEventListener "command", ((event) ->
  if event.command is "bookmark"
    browserWindow = sBookmark.findActiveBrowserWindow(event)
    browserWindow.activeTab.page.dispatchMessage "PageInfoRequest", "please"
), false

safari.application.addEventListener "message", ((event) ->
  data = event.message
  if event.name is "PageInfoResponse"
    console.log "add bookmark: " + data.title + " - (" + data.href + ")"
    sBookmark.insertBookmark data.href, data.title  if data.href and data.href isnt "about:blank"
  else openNewPage data  if event.name is "OpenNewPage"
), false

sBookmark.initializeLocalStorage()
