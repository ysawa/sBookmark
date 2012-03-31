SB = this.SB

this.openNewPage = (url) ->
  console.log "open new page: " + url
  safari.application.activeBrowserWindow.openTab().url = url
  SB.closePopovers()

safari.application.addEventListener "command", ((event) ->
  if event.command is "bookmark"
    browserWindow = SB.findActiveBrowserWindow(event)
    browserWindow.activeTab.page.dispatchMessage "PageInfoRequest", "please"
), false

safari.application.addEventListener "message", ((event) ->
  data = event.message
  if event.name is "PageInfoResponse"
    console.log "add bookmark: " + data.title + " - (" + data.href + ")"
    SB.insertBookmark data.href, data.title  if data.href and data.href isnt "about:blank"
  else openNewPage data  if event.name is "OpenNewPage"
), false

SB.initializeLocalStorage()
