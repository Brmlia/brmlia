import React, { Component } from "react";
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

export async function loadSlices(cntxt, volume, axes, files, type) {
  if (type === 1) {
    await _loadSlicesFromMultipageFile(cntxt, volume, axes, files[0])
  }
  else {
    _loadSlicesFromMultipleFiles(cntxt, volume, axes, files)
  }
}

export async function updateChannelSlice(cntxt, volume, slice, axes, axis) {
  if (cntxt && volume && axes) {
    await volume.renderChannelSlice(cntxt, axes[axis], slice)
  }
}

async function _loadVolumes(volume, pages, width) {
  for (var pIdx = 0; pIdx < pages.length; pIdx++) {
    const page = pages[pIdx]

    const pct = Math.round((pIdx/pages.length)*100)
    if ((pct % 10) === 0) {
      stateApi.setState({
        loaded: pct
      })
    }

    console.log("loading ", pIdx , "/", pages.length)
    await volume.load(page, width, pIdx)
  }
}

async function _loadSlicesFromMultipageFile(cntxt, volume, axes, file) {
  if (file && (file.pages) && (file.pages.length > 0)) {
    await _loadVolumes(volume, file.pages, file.image.width)
  }

  updateChannelSlice(cntxt, volume, 0, axes, 0);
}

function _loadSlicesFromMultipleFiles(cntxt, volume, axes, files) {
  for (var fIdx = 0; fIdx < files.length; fIdx++) {
    const file = files[fIdx]
    if (file && (file.pages) && (file.pages.length > 0)) {
      const pages = file.pages
      for (var pIdx = 0; pIdx < pages.length; pIdx++) {
        const page = pages[pIdx]
        volume.load(this.state.cntxt, page, file.image.width, fIdx)
      }
      updateChannelSlice(cntxt, volume, 0, axes, 0);
    }
  }
}

class ProgressBar extends Component {

  state = {
    loaded: 0
  }
  render() {
    stateApi.subscribe(state => {
      this.state.loaded = state.loaded
    })
    return (
      <Progress striped bar value={this.state.loaded}> {this.state.loaded}% </Progress>
    )
  }
}

export default ProgressBar;
