import React, { Component } from "react";
import { fApi } from '../../utils/index.js'
import {Volume} from '../../datacube/volume.js'
import DataCube from '../../datacube/datacube.js'
import {
  Button
} from 'reactstrap';

class DatacubeTiff extends Component {
  constructor(props) {
    super(props);

    this.canvas = React.createRef();
    this.state = {
      axis: 'x',
      axes: ['x', 'y', 'z'],
      slice: {
        x: 1,
        y: 1,
        z: 1
      },
      size: {
        x: 256,
        y: 256,
        z: 256
      },
      image: null,
      axisIdx: 2,
      sliceIdx: 0,
      cntxt: null,
      files: {
        length: 0
      }
    }
    this.length = 0
  }

  componentDidMount() {
    this.setState(prevState => ({
      cntxt: this.canvas.current.getContext("2d")
    }))
  }

  updateForFile(state) {
    if (state && state.file) {
      const idx = state.file.length - 1

      if ((state.file.length > 0) && (state.file[idx].pages) && (state.file[idx].pages.length > 0) && (state.file.length !== this.length)) {
        this.volume = new Volume({
          channel: new DataCube({
            bytes: 1,
            size: this.state.size,
            context: this.state.cntxt
          }),
        });
        this.setState( prevState => ({
          ...prevState,
          image: state.file[idx].pages[0],
          files: {
            ...prevState.files,
            length: prevState.files.length + 1
          }
        }
        ));
        this.length = state.file.length

        this.loadSlicesFromMultipleFiles(state.file)
        // this.loadSlicesFromMultipageFile(state.file[0])
      }
    }
    this.forceUpdate();
  }

  loadSlicesFromMultipleFiles(files) {
    for (var fIdx = 0; fIdx < files.length; fIdx++) {
      const file = files[fIdx]
      if (file && (file.pages) && (file.pages.length > 0)) {
        const pages = file.pages
        for (var pIdx = 0; pIdx < pages.length; pIdx++) {
          const page = pages[pIdx]
          this.volume.load(this.state.cntxt, page, file.image.width, fIdx)
          this.updateChannelSlice(this.state.sliceIdx, this.state.axisIdx);
        }
      }
    }
  }

  loadSlicesFromMultipageFile(file) {
    if (file && (file.pages) && (file.pages.length > 0)) {
      const pages = file.pages
      for (var pIdx = 0; pIdx < pages.length; pIdx++) {
        const page = pages[pIdx]

        console.log("loading ", pIdx , "/", pages.length)
        this.volume.load(this.state.cntxt, page, file.image.width, pIdx)
        this.updateChannelSlice(this.state.sliceIdx, this.state.axisIdx);
      }
    }
  }

  updateChannelSlice(slice, axis) {

    if (this.canvas.current && this.volume && this.state.axes) {

      this.volume.renderChannelSlice(this.state.cntxt, this.state.axes[axis], slice)
      this.forceUpdate();
    }
  }

  nextSlice(dec) {
    var slice
    if (dec) slice = (this.clamp(this.state.sliceIdx - 1, 0, 10))
    else slice = (this.clamp(this.state.sliceIdx + 1, 0, 10))

    this.setState( prevState => ({
      ...prevState,
      sliceIdx: slice
    }));
    this.updateChannelSlice(slice, this.state.axisIdx);
  }

  nextAxis(dec) {
    var idx
    if (dec) idx = (this.state.axisIdx + 2) % this.state.axes.length
    else idx = (this.state.axisIdx + 1) % this.state.axes.length

    this.setState( prevState => ({
      ...prevState,
      axisIdx: idx
    }));
    this.updateChannelSlice(this.state.sliceIdx, idx);
  }

  clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
  }

  render() {
    fApi.subscribe(state =>  {
      this.updateForFile(state);
    })
    return (
      <div>
        <Button onClick={() => {this.nextSlice(false)}}> Next Slice </Button>
        <Button onClick={() => {this.nextAxis(false)}}> Next Axis </Button>

        <Button onClick={() => {this.nextSlice(true)}}> Prev Slice </Button>
        <Button onClick={() => {this.nextAxis(true)}}> Prev Axis </Button>
        <canvas id="canvas-1" ref={this.canvas}
          width="750px"
          height="750px"
        >
        </canvas>
        <h3> axis: {this.state.axes[this.state.axisIdx]} </h3> <br/>
        <h3> slice: {this.state.sliceIdx} </h3>
      </div>
    )
  }
}

export default DatacubeTiff;