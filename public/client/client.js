const webpushPublicKey = 'BFLveoM-kOJFPM6M-_nWrh4_hSDPH_Fm9jIIUAlC58-Pz7jM15K96dFZKlvZ81OKnD7A90TMPfpZVObNuFC1Yaw';

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

if ('serviceWorker' in navigator) {
  send().catch(error => console.error(error));
}

// register the service worker, register out push api, send notification
async function send() {
  // register service worker
  const register = await navigator.serviceWorker.register('./worker.js', {
    scope: './'
  });

  // register push
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,

    // public vapid key
    applicationServerKey: urlBase64ToUint8Array(webpushPublicKey)
  });


  // send push notification
  await fetch("http://localhost:3333/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json"
    }
  })
  .then(function (response) {
    if (!response.ok) {
      throw new Error('Bad status code from server.');
    }

    return response.json();
  })
  .then(function (responseData) {
    if (!(responseData.data && responseData.data.success)) {
      throw new Error('Bad response from server.');
    }
  });;
}