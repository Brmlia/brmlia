
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

async function getFiles(filename) {
  let cacheObj;
  let resp;
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
  return resp
}

export async function getText(filename) {
  let content
  const resp = await getFiles(filename)
  if (resp) {
    await resp.text().then((text) => {
      content = text
    })
  }
  console.log("[Cache] text: ", content)

  return content
}

export async function getJson(filename) {
  let content
  const resp = await getFiles(filename)
  if (resp) {
    await resp.json().then((json) => {
      content = json
    })
  }
  console.log("[Cache] json: ", content)

  return content
}

export async function getArrayBuffer(filename) {
  let content
  const resp = await getFiles(filename)
  if (resp) {
    await resp.arrayBuffer()
      .then((arrayBuffer) => {
        content = arrayBuffer
    })
  }
  console.log("[Cache] array buffer: ", content)

  return content
}

export async function getBlob(filename) {
  let content
  const resp = await getFiles(filename)
  if (resp) {
    await resp.blob()
      .then((blob) => {
        content = blob
    })
  }
  console.log("[Cache] blob: ", content)
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
