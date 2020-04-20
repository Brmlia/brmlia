import React, {Component} from "react";
import SampleTiff from './sampleTiff.js'
import ThreeTiff from './threeTiff.js'
import DatacubeTiff from './datacubeTiff.js'


class Tiff extends Component {

  sampleTiff() {
    // return (
    //   <SampleTiff />
    // )
    return (
      <div />
    )
  }

  threeTiff() {
    // return (
    //   <ThreeTiff />
    // )
    return (
      <div />
    )
  }

  dcTiff() {
    return (
      <DatacubeTiff />
    )
    // return (
    //   <div />
    // )
  }

  render() {
    return (
      <div>
        {this.sampleTiff()}
        {this.threeTiff()}
        {this.dcTiff()}
      </div>
    )
  }
}

export default Tiff
