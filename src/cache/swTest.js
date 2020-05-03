import React, { Component, useEffect } from 'react';
import { registerWorker } from './cache.js'

class SwTest extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.sw = registerWorker()
    this.counter = 0
  }

  increment() {
    this.stateToServiceWorker(this.counter);
    this.counter += 1
  };

  stateToServiceWorker(data) {
    if (this.sw && this.sw.controller) {
      this.sw.controller.postMessage(data);
    }
  };

  render() {
    return (
      <button className="increment" onClick={() => {this.increment();}}>
        +
      </button>
    )
  }
}

export default SwTest