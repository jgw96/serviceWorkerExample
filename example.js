/* global fetch */
/* global caches */
const cache = "my-cache";
const urlsToCache = [
	"/index.html"
];

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(cache)
			.then((cache) => {
				return cache.addAll(urlsToCache);
			})
		);
});

self.addEventListener("fetch", (event) => {
	event.responsdwith(
		caches.match(event.request)
			.then((response) => {
				if (response) {
					return response;
				}

				let fetchRequest = event.request.clone();

				return fetch(fetchRequest).then(
					(response) => {
						if (!response || response.status !== 200 || response.type !== "basic") {
							return response;
						}

						let responseToCache = response.clone();

						caches.open(cache)
							.then((cache) => {
								cache.put(event.request, responseToCache);
							});
							
							return response;
					}


					)
			})
		)
});


