
export function registerWorker() {
  const sw = navigator.serviceWorker;

  if (sw) {
    window.addEventListener("load", function() {
      sw.register("/sw.js")
        .then(() => sw.ready)
        .then(() => {
          console.log("[Cache] Service Worker Ready")
        })
        .catch( error => {
          console.log("[Cache] Service Worker ERROR", error)
        })
    })
  }

  return sw
}

export async function getFiles(filename) {
  let cacheObj;
  let resp;
  let content;
  await caches.open('file-cache').then((cache) => {
    cacheObj = cache;
  })
  if (cacheObj) {
    await cacheObj.match(filename)
      .then(function(response) {
        console.log("[Cache] response: ", response)
        resp = response
      })
  }

  if (resp) {
    // await resp.text().then((text) => {
    //   content = text
    // })
    // await resp.json().then((json) => {
    //   content = json
    // })
    // await resp.arrayBuffer()
    //   .then((arrayBuffer) => {
    //     content = arrayBuffer
    // })
    await resp.blob()
      .then((blob) => {
        content = blob
    })
  }
  console.log("[Cache] content: ", content)

  return content
}


export function saveFiles(sw, filename, text) {

  if (sw && navigator.storage) {
    navigator.storage.estimate().then((quota) => {
      const tQuota = quota.quota
      const usage = quota.usage
      console.debug("[Cache] storage - total available: %d, used: %d (%d)", tQuota, usage, (usage/tQuota * 100))
    })
      .catch((err) => {
        console.error('*** Unable to update quota ***', err);
      })
      .then(() => {
        setTimeout(() => {
          console.log(".")
        }, 500);
      });
  }

  let cacheObj;
  caches.open('file-cache').then((cache) => {
    cacheObj = cache;
    if (cacheObj) {
      const response = new Response(text)

      console.log("[Cache] cache: ", cacheObj, response, text)
      cacheObj.put(filename, response)
        .catch((err) => {
          console.error(`*** Cache API: '${err.name}' ***`, err);
          alert('Oops: Error writing to Cache API, check console.');
        })
    }
  })
  return cacheObj
}
