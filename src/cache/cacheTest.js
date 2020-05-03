import React, { Component, useEffect } from 'react';
import { registerWorker, saveFiles, getFiles } from './cache.js'

class CacheTest extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.sw = registerWorker()
    this.counter = 0
    this.cache = null
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

  cacheFiles() {
    const filename = "samplefile-" + this.counter + ".txt"
    // const json = this.sampleJson()
    // const content = JSON.stringify(json)

    // const content = this.sampleTxt()

    // const content = this.sampleArrayBuffer()

    const content = this.sampleBlob()

    this.cache = saveFiles(this.sw, filename, content)
    this.counter += 1
  }

  async retrieveFiles() {
    await getFiles("samplefile-0.txt").then((content) => {
      console.log("[CacheTest] content", content)
    })
  }
  render() {
    return (
      <div>
        <button className="cacheFile" onClick={() => {this.cacheFiles();}}>
          Cache Test File
        </button>
        <button className="getFiles" onClick={() => {this.retrieveFiles();}}>
          Get Test Files
        </button>
      </div>
    )
  }
}

export default CacheTest