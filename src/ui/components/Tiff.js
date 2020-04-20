import React, {Component} from "react";
import SampleTiff from './sampleTiff.js'
import ThreeTiff from './threeTiff.js'
import DatacubeTiff from './datacubeTiff.js'


class Tiff extends Component {

  type = 2;

  display() {
    if (this.type === 0) {
      return (
        <SampleTiff />
      )
    }
    else if (this.type === 1) {
      return (
        <ThreeTiff />
      )
    }
    else if (this.type === 2) {
      return (
        <DatacubeTiff />
      )
    }
    else {
      return (
        <div />
      )
    }
  }

  render() {
    return (
      this.display()
    )
  }
}

export default Tiff
