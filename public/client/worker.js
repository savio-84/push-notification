self.addEventListener("push", e => {
  const data = e.data.json();
  self.ServiceWorkerRegistration.showNotification(
    data.title, // title of the notification
    {
      body: "Push notification from section.io",
      image: "https://pixabay.com/vectors/bell-notification-communication-1096280/",
      icon: "https://pixabay.com/vectors/bell-notification-communication-1096280/" // icon 
    }
  )
})