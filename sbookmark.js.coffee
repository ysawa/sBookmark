this.sBookmark =
  closePopovers: ->
    popovers = safari.extension.popovers
    i = 0

    while i < popovers.length
      popovers[i].hide()
      i++

  findActiveBrowserWindow: (event) ->
    browserWindow = undefined
    if event.target.browserWindow
      browserWindow = event.target.browserWindow
    else if event.target instanceof SafariExtensionMenuItem
      menuId = event.target.identifier.split(":")[0]
      browserWindow = windowByMenuId[menuId]
    else
      browserWindow = safari.application.activeBrowserWindow
    browserWindow

  findBookmarks: ->
    bookmarks = []
    i = 0

    while i < @getAutoIncrement()
      bookmark = getBookmark(i)
      bookmarks.push bookmark
      i++
    bookmarks

  getAutoIncrement: ->
    parseInt localStorage.auto_increment

  getBookmark: (key) ->
    store_key = @makeBookmarkKey(key)
    json = localStorage[store_key]
    if json is `undefined`
      `undefined`
    else
      JSON.parse json

  getCount: ->
    parseInt localStorage.count

  incrementAutoIncrement: ->
    localStorage.auto_increment = @getAutoIncrement() + 1
    parseInt localStorage.auto_increment

  incrementCount: ->
    localStorage.count = @getCount() + 1
    parseInt localStorage.count

  initializeLocalStorage: ->
    @setCount 0  if localStorage.count is `undefined`
    @setAutoIncrement 0  if localStorage.auto_increment is `undefined`

  insertBookmark: (href, title) ->
    data = {}
    data.href = href
    data.title = title
    data.timestamp = parseInt((new Date) / 1000)
    key = @getAutoIncrement()
    @setBookmark key, data
    @incrementAutoIncrement()
    @incrementCount()
    @refreshPopovers()

  makeBookmarkKey: (key) ->
    store_key = "bookmark_" + key
    store_key

  refreshPopovers: ->
    popovers = safari.extension.popovers
    i = 0

    while i < popovers.length
      popovers[i].contentWindow.location.reload()
      i++

  setAutoIncrement: (value) ->
    localStorage.auto_increment = value
    parseInt localStorage.auto_increment

  setBookmark: (key, value) ->
    store_key = @makeBookmarkKey(key)
    localStorage[store_key] = JSON.stringify(value)
    localStorage[store_key]

  setCount: (value) ->
    localStorage.count = value
    parseInt localStorage.count

  truncate: (text, length) ->

