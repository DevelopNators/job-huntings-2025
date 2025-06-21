importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Replace with your Firebase config
firebase.initializeApp({
  apiKey: 'your-api-key',
  authDomain: 'your-auth-domain',
  projectId: 'your-project-id',
  storageBucket: 'your-storage-bucket',
  messagingSenderId: 'your-messaging-sender-id',
  appId: 'your-app-id'
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message:', payload);

  // Only manually show notification if it's a data-only message
  if (!payload.notification) {
    const { Title, Description, Image, RedirectUrl } = payload.data;

    const notificationTitle = Title || 'New Notification';
    const notificationOptions = {
      body: Description || 'You have a new message.',
      icon: Image || '/pwa-192x192.png',
      data: {
        RedirectUrl: RedirectUrl || '/'
      }
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  }
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const redirectUrl = event.notification.data?.RedirectUrl || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === redirectUrl && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(redirectUrl);
      }
    })
  );
});
