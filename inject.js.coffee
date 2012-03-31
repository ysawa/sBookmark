safari.self.addEventListener "message", ((event) ->
  return  if location.href.match(/safari-extension:\/\//)
  console.log event.name
  if event.name is "PageInfoRequest"
    data = {}
    data["href"] = location.href
    data["title"] = document.title
    safari.self.tab.dispatchMessage "PageInfoResponse", data
), false
