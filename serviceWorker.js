const staticWorkPlayce = "workplayce"
const assets = [
  "/",
  "/index.html",
  "/pages/sign.html",
  "/css/home.css",
  "/css/login.css",
  "/js/footer.js",
  "/js/header.js",
  "/js/http.js",
  "/js/login.js",
  "/img/logo.png",
]

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
})

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticWorkPlayce).then(cache => {
      cache.addAll(assets)
    })
  )
})