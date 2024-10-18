'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "98e51416b9327724b3d3d881c3ded7bd",
"assets/AssetManifest.bin.json": "cfd18c541e8f247a6d7765b166b5a7c1",
"assets/AssetManifest.json": "50ac8f70bfa210d920eb20a627b71e90",
"assets/assets/images/age.png": "2e07a34d443d0304573fabfc296bedcd",
"assets/assets/images/email.png": "6b904b431b436a61463f469bc56f01b4",
"assets/assets/images/from.png": "18b9723adbfb1deee173d553adad4c31",
"assets/assets/images/github.png": "bd6e6f52175b6e3ee02a7f6280f1976c",
"assets/assets/images/linkedin.png": "c1b42574c7349495a09f1662a33eddcf",
"assets/assets/images/person.png": "1f041144f8863381e400d317cd48c28d",
"assets/assets/images/person2.png": "bbd1a02f21b3ccefc628418c14a28010",
"assets/assets/images/projects/economy/economy1.png": "f1c94bc855f9441ea4375b2fcdf828ab",
"assets/assets/images/projects/economy/economy2.png": "77e04f7422c1839bdee00fe43889a00a",
"assets/assets/images/projects/economy/economy3.png": "700e5d1af52e0aad446e7cdbd224655c",
"assets/assets/images/projects/economy/economy4.png": "2685d955492b4253386f75fe4ab9718c",
"assets/assets/images/projects/economy/economy5.png": "caec947feb2b23b436809aa5e274c576",
"assets/assets/images/projects/economy/economy6.png": "977d7ed61fb804ba135ba7138f90c272",
"assets/assets/images/projects/economy/economy7.png": "388a8d7e0c22eba46ccd189f0e92a315",
"assets/assets/images/projects/olimpiadas/olimpiadas1.jpg": "e3d3b7bf0430dd9e23887dc96be16813",
"assets/assets/images/projects/olimpiadas/olimpiadas2.jpg": "47b39a540de6c49ae133624c75bf6f00",
"assets/assets/images/projects/olimpiadas/olimpiadas3.jpg": "4bab668729a98e905b95036e5d77417c",
"assets/assets/images/projects/olimpiadas/olimpiadas4.jpg": "bfecac5c327e57e11a6942093df4622c",
"assets/assets/images/projects/olimpiadas/olimpiadas5.jpg": "a33b7b1685b1c38463a1e15bb022b399",
"assets/assets/images/projects/olimpiadas/olimpiadas6.jpg": "d6a802fc6283021f01ec5d42768920ba",
"assets/assets/images/projects/spotify/spotify.png": "99c077af75f571e5d3e80fa2dda569b2",
"assets/data/projects.json": "797535c1394cea8b0b85b8519e383add",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "8337f9a0cce071d8410b7915ea2263b1",
"assets/NOTICES": "1d739181246c5dba172b8ff0f85b8d93",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "4096b5150bac93c41cbc9b45276bd90f",
"canvaskit/canvaskit.js": "eb8797020acdbdf96a12fb0405582c1b",
"canvaskit/canvaskit.wasm": "73584c1a3367e3eaf757647a8f5c5989",
"canvaskit/chromium/canvaskit.js": "0ae8bbcc58155679458a0f7a00f66873",
"canvaskit/chromium/canvaskit.wasm": "143af6ff368f9cd21c863bfa4274c406",
"canvaskit/skwasm.js": "87063acf45c5e1ab9565dcf06b0c18b8",
"canvaskit/skwasm.wasm": "2fc47c0a0c3c7af8542b601634fe9674",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "59a12ab9d00ae8f8096fffc417b6e84f",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "9d51502d3c00fe0e995863b87d63ba36",
"/": "9d51502d3c00fe0e995863b87d63ba36",
"main.dart.js": "ae2cd58b3c08cf6c151d8a87dcb0c907",
"manifest.json": "5ebcb4796f3d024a8cd0d9417bdc3455",
"version.json": "67c6b5991933c1a481d8c95fd491e57e"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
