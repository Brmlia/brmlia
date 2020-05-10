import React, { Component } from 'react';
import create from 'zustand';
import {
  Progress
} from 'reactstrap';

const state = {
  loaded: 0
}
const [useState, stateApi] = create (set => ({
  ...state
}))

export async function loadSlices(cntxt, volume, axes, axis, files, type, fileIdx) {
  if (type === 1) {
    await _loadSlicesFromMultipageFile(cntxt, volume, axes, axis, files[fileIdx])
  }
  else {
    await _loadSlicesFromMultipleFiles(cntxt, volume, axes, axis, files)
  }
}

export async function updateChannelSlice(cntxt, volume, slice, axes, axis, invertV) {
  if (cntxt && volume && axes) {
    await volume.renderChannelSlice(cntxt, axes[axis], slice, invertV)
  }
}

async function _loadVolumes(volume, pages, width) {
  for (var pIdx = 0; pIdx < pages.length; pIdx++) {
    const page = pages[pIdx]

    const pct = Math.round((pIdx/(pages.length-1))*100)
    if ((pct % 10) === 0) {
      stateApi.setState({
        loaded: pct
      })
    }

    // console.log("loading ", pIdx , "/", pages.length-1)
    await volume.load(page, width, pIdx)
  }
}

async function _loadSlicesFromMultipageFile(cntxt, volume, axes, axis, file) {
  if (file && (file.pages) && (file.pages.length > 0)) {
    await _loadVolumes(volume, file.pages, file.image.width)
  }
}

async function _loadSlicesFromMultipleFiles(cntxt, volume, axes, axis, files) {
  for (var fIdx = 0; fIdx < files.length; fIdx++) {
    const file = files[fIdx]
    if (file && (file.pages) && (file.pages.length > 0)) {
      const pages = file.pages
      for (var pIdx = 0; pIdx < pages.length; pIdx++) {
        const page = pages[pIdx]
        const zoffset =  fIdx * (pages.length) + pIdx;
        await volume.load(page, file.image.width, zoffset)
      }
    }
  }
}

class ProgressBar extends Component {

  state = {
    loaded: 0
  }

  display = () => {
    if (this.state.loaded !== 100) {
      return (
        <Progress striped bar value={this.state.loaded}> {this.state.loaded}% </Progress>
      )
    }
    else {
      return (
        <div> </div>
      )
    }
  }

  render() {
    stateApi.subscribe(state => {
      this.state.loaded = state.loaded
    })
    return (
      this.display()
    )
  }
}

export default ProgressBar;
