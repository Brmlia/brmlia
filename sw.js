self.addEventListener("message", ({ data, source: { id } }) => {
  if (id) {
    console.log("id: ", id)
    clients &&
      clients.matchAll().then(clients => {
        clients.forEach(client => {
          console.log(data, client);
          if (client.id !== id) client.postMessage(data);
        });
      });
  }
});
