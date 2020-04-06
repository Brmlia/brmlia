import React from "react";
import TestImageWrapper from "./TestImageWrapper.js";
import { fApi, uApi } from '../../components/utils.js'
import { updateImage } from './CanvasControl.js'

class TestImageComponent extends React.Component {

  state = {
    selected: 0
  }

  selectOther() {
    var selected;
    if (this.state.selected === 0) {
      selected = 1
    }
      else if (this.state.selected === 1) {
        selected = 0
      }

    this.setState( prevState => ({
      selected: selected
    }))

    this.updateForFile(fApi.getState())
  }

  selectOther1() {
    var selected;
    if (this.state.selected === 0) {
      selected = 1
    }
      else if (this.state.selected === 1) {
        selected = 0
      }

    this.setState( prevState => ({
      selected: selected
    }))
  }

  updateForFile(state) {
    if (state) {
      updateImage(state.file[this.state.selected]);
    }
  }
  updateForControls(state) {
    this.forceUpdate();
  }

  render() {
    fApi.subscribe(state =>  {
      this.updateForFile(state);
    })
    uApi.subscribe(state =>  {
      this.updateForControls(state);
    })

    return (
      <div>
       <button  onClick={() => this.selectOther() }> Change Selected </button>
        <TestImageWrapper />
      </div>
    )
  }
}
export default TestImageComponent;
