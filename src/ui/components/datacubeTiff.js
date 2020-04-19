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
  }

  componentDidMount() {
    this.setState(prevState => ({
      cntxt: this.canvas.current.getContext("2d")
    }))
  }

  updateForFile(state) {
    if (state && state.file) {

      if (state.file.length > 0 && state.file[0].pages.length > 0 && (state.file.length !== this.state.files.length)) {
        this.volume = new Volume({
          channel: new DataCube({
            bytes: 1,
            size: this.state.size,
            context: this.state.cntxt
          }),
        });
        this.setState( prevState => ({
          ...prevState,
          image: state.file[0].pages[0],
          files: {
            ...prevState.files,
            length: prevState.files.length + 1
          }
        }
        ));

        // for (var pIdx = 0; pIdx < state.file[0].pages.length; pIdx++) {
        //   const page = state.file[0].pages[pIdx]
        //   this.volume.load(this.state.cntxt, page, state.file[0].image.width);
        // }
        const page1 = state.file[0].pages[0]
        this.volume.load(this.state.cntxt, page1, state.file[0].image.width);
        const page2 = state.file[0].pages[9]
        this.volume.load(this.state.cntxt, page2, state.file[0].image.width);
        // const page3 = state.file[0].pages[19]
        // this.volume.load(this.state.cntxt, page3, state.file[0].image.width);
        this.updateChannelSlice(this.state.sliceIdx, this.state.axisIdx);
      }
    }
    this.forceUpdate();
  }

  updateChannelSlice(slice, axis) {

    if (this.canvas.current && this.volume && this.state.axes) {


      this.volume.renderChannelSlice(this.state.cntxt, this.state.axes[axis], slice)
      this.forceUpdate();
    }
  }

  nextSlice() {
    const slice = this.state.sliceIdx + 1
    this.setState( prevState => ({
      ...prevState,
      sliceIdx: slice
    }));
    this.updateChannelSlice(slice, this.state.axisIdx);
  }

  nextAxis() {
    const axis = (this.state.axisIdx + 1) % this.state.axes.length
    this.setState( prevState => ({
      ...prevState,
      axisIdx: axis
    }));
    this.updateChannelSlice(this.state.sliceIdx, axis);
  }

  render() {
    fApi.subscribe(state =>  {
      this.updateForFile(state);
    })
    return (
      <div>
        <Button onClick={() => {this.nextSlice()}}> Next Slice </Button>
        <Button onClick={() => {this.nextAxis()}}> Next Axis </Button>
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