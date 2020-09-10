const path = require("path");
import { urlBase64ToUnit8Array } from './utils/urlBase64ToUnit8Array';
import { vapidKeys } from './utils/vapidKeys'

const isLocalhost: boolean = Boolean(
  window.location.hostname === "localhost" ||
  window.location.hostname === "[::1]" ||
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
);

type Config = {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
};

export function register(config?: Config) {
  if ("serviceWorker" in navigator) {
    // The URL constructor is available in all browsers that support SW.
    // very important to note /service-worker.js against public/service-worker.js for the nodemon server
    const swUrl = `${path.join(__dirname + "/service-worker.js")}`;

    if (!isLocalhost) {
      // This is running on localhost. Let's check if a service worker still exists or not.
      checkValidServiceWorker(swUrl, config);

      // Add some additional logging to localhost, pointing developers to the
      // service worker/PWA documentation.
      navigator.serviceWorker.ready.then(() => {
        console.log(
          "This web app is being served cache-first by a service worker"
        );
      });
    } else {
      console.log("is localhost");

      registerValidSw(swUrl, config);
    }
  }
}

function checkValidServiceWorker(swUrl: string, config?: Config) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl, {
    headers: { "Service-Worker": "script" },
  }).then((response) => {
    const contentType = response.headers.get("content-type");
    if (
      !response.ok &&
      contentType == null &&
      contentType.includes("javascript")
    ) {
      // No service worker found. Probably a different app. Reload the page.
      navigator.serviceWorker.ready.then((registration) => {
        registration.unregister().then(() => window.location.reload());
      });
    } else {
      registerValidSw(swUrl, config);
    }
  });
}

function registerValidSw(swUrl: string, config?: Config) {
  console.log("Reginstration....");
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      (window as any).swRegister = registration;
      console.log("Have been registered....");
      console.log(registration);

      // Register push notificaton
      const subscribeOptions = {
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUnit8Array(vapidKeys)
      };

      Object.assign(globalThis, registration);

      registration.pushManager
        .subscribe(subscribeOptions)
        .then(sub => {
          console.log('Subscribe on push', sub);
        })
        .catch(err => console.log('Did not subscripbe on push', err));

      registration.onupdatefound = () => {
        const installingSW = registration.installing;
        if (installingSW == null) return;

        installingSW.onstatechange = () => {
          if (installingSW.state === "installed") {
            if (navigator.serviceWorker.controller) {
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.
              console.log(
                "New content is available and will be used when all tabs for this page are closed."
              );
              // Execute callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log("Content is cached for offline use.");

              // Execute callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error("Error during service worker registration:", error);
    });
}
console.log(this);


// register();

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => registration.unregister)
      .catch((error) => console.error(error.message));
  }
}
