const parser = require("fast-xml-parser")
const URL = "https://getpocket.com/users/*em15676512207826841/feed/all"
const domParser = new DOMParser

function decode(inputHtml) {
  const dom = domParser.parseFromString(`<!doctype html><body>${inputHtml}</body></html>`, "text/html")

  return dom.body.textContent
}

async function updateBar() {
  const URL     = `https://cors-anywhere.herokuapp.com/${settings.rssFeed}`
  const xml     = await fetch(URL).then(res => res.text())
  const json    = parser.parse(xml)
  const content = json.rss.channel.item.map(item => `<span>${decode(item.title)}</span>`).join("<span class=\"spacer\">/</span>")
  
  scrollerInner.innerHTML = content
}

updateBar()

setInterval(() => {
  updateBar()
}, settings.updateInterval)
