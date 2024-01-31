// REPO - https://github.com/prof3ssorSt3v3/potential-winner

(function () {
  //runs after DOM is loaded
  navigator.serviceWorker
    .register('/sw.js')
    .then(function (registration) {
      console.log('ServiceWorker registration successful');
    })
    .catch((err) => {
      console.warn('FAILED TO REGISTER SERVICE WORKER');
    });
})();
