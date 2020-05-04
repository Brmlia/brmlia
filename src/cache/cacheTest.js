import React, { Component } from 'react';
import { registerWorker, saveFiles, getText, getJson, getArrayBuffer, getBlob } from './cache.js'

class CacheTest extends Component {

  componentDidMount() {
    this.sw = registerWorker()
    this.counter = 0
  }

  sampleJson() {
    return (
        {
          json: {
            1: "blah.txt",
            2: null
        }
      }
    )
  }

  sampleArrayBuffer() {
    const buffer = new ArrayBuffer(8)
    const uint8 = new Uint8Array(buffer)
    uint8.set([0, 1, 2, 5, 5, 5, 6, 7])
    return uint8
  }

  sampleTxt() {
    return (
      "{ txt: {1: blah.txt, 2: null}}"
    )
  }

  sampleBlob() {
    const obj = {hello: 'world'};
    return new Blob([JSON.stringify(obj, null, 2)], {type : 'application/json'});
  }

  cacheText() {
    const filename = "samplefile-" + this.counter + ".txt"
    const content = this.sampleTxt()
    saveFiles(this.sw, filename, content)
  }

  cacheJson() {
    const filename = "samplefile-" + this.counter + ".json"
    const json = this.sampleJson()
    const content = JSON.stringify(json)
    saveFiles(this.sw, filename, content)
  }

  cacheArrayBuffer() {
    const filename = "samplefile-" + this.counter + ".buf"
    const content = this.sampleArrayBuffer()
    saveFiles(this.sw, filename, content)
  }

  cacheBlob() {
    const filename = "samplefile-" + this.counter + ".blob"
    const content = this.sampleBlob()
    saveFiles(this.sw, filename, content)
  }

  cacheFiles() {
    this.cacheText()
    this.cacheJson()
    this.cacheArrayBuffer()
    this.cacheBlob()
    this.counter += 1
  }

  async getCachedText() {
    const filename = "samplefile-0.txt"
    await getText(filename).then((content) => {
      console.log("[CacheTest] txt", content)
    })
  }

  async getCachedJson() {
    const filename = "samplefile-0.json"
    await getJson(filename).then((content) => {
      console.log("[CacheTest] json", content)
    })
  }

  async getCachedArrayBuffer() {
    const filename = "samplefile-0.buf"
    await getArrayBuffer(filename).then((content) => {
      console.log("[CacheTest] buf", content)
    })
  }

  async getCachedBlob() {
    const filename = "samplefile-0.blob"
    await getBlob(filename).then((content) => {
      console.log("[CacheTest] blob", content)
    })
  }

  async getFiles() {
    this.getCachedText()
    this.getCachedJson()
    this.getCachedArrayBuffer()
    this.getCachedBlob()
  }
  render() {
    return (
      <div>
        <button className="cacheFile" onClick={() => {this.cacheFiles();}}>
          Cache Test File
        </button>
        <button className="getFiles" onClick={() => {this.getFiles();}}>
          Get Test Files
        </button>
      </div>
    )
  }
}

export default CacheTest