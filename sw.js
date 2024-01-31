const version = 5;
const cacheName = `static-${version}`;

const staticAssets = ['/', '/index.html', '/404.html', '/css/main.css', '/js/main.js', '/img/teemu-paananen-fern-unsplash-min.jpg'];

self.addEventListener('install', (ev) => {
  ev.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(staticAssets);
    })
  );
});

self.addEventListener('activate', (ev) => {
  //get rid of the old caches
  ev.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => {
            //remove cache names that don't match ! = =
            return key !== cacheName;
          })
          .map((key) => {
            //call delete on old cache names left in array
            return caches.delete(key);
          })
      );
    })
  );
});

self.addEventListener('fetch', (ev) => {
  // online?
  // is the request for an image
  // is it in the cache?
  // is it a different domain?
  if (ev.request.url.includes('.jpg')) {
    //they asked for an image
    ev.respondWith(caches.match('/img/teemu-paananen-fern-unsplash-min.jpg'));
  } else {
    //not a jpg
    ev.respondWith(
      fetch(ev.request)
        .then((response) => {
          if (!response.ok) throw new Error('nope');
          return response;
        })
        .catch(() => {
          return caches.match('/404.html'); //an actual 404 page
          // new Response(null, { status: 404 });
        })
    );
  }
});
