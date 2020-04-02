import React from "react";
import TestImageWrapper from "./TestImageWrapper.js";
import Slider from "./../../components/slider.js";
import { withUniformStore } from '../../components/utils.js';

class TestImageComponent extends React.Component {

  state = {
    slider: {
      brightness: '0.0',
      contrast: '0.0'
    }
  }

  api = this.props.api;

  updateBrightness() {
    if (this.api.getState().uniforms.brightness) {
      if (this.state.slider.brightness !== this.api.getState().uniforms.brightness.value){
        this.api.setState( prevState => ({
          uniforms: {
            ...prevState.uniforms,
            brightness: {
              value: this.state.slider.brightness
            }
          }
        }));
      }
      return true;
    }
    else {
      console.log("null state", this.api.getState())
    }
    return false;
  }

  updateContrast() {
    if (this.api.getState().uniforms.contrast) {
      if (this.state.slider.contrast !== this.api.getState().uniforms.contrast.value){
        this.api.setState( prevState => ({
          uniforms: {
            ...prevState.uniforms,
            contrast: {
              value: this.state.slider.contrast
            }
          }
        }));
      }
      return true;
    }
    else {
      console.log("null state", this.api.getState())
    }
    return false;
  }

  sliderValueBr(value) {
    this.setState( prevState => ({
      slider: {
        ...prevState.slider,
        brightness: value
      }
    }));

    this.updateBrightness()
    console.log("sliderValueBr() - ch br: " + this.state.slider.brightness + " ch ct: " + this.state.slider.contrast);
  }

  sliderValueCt(value) {
    this.setState( prevState => ({
      slider: {
        ...prevState.slider,
        contrast: value
      }
    }));
    this.updateContrast()
    console.log("sliderValueCt() - ch br: " + this.state.slider.brightness + " ch ct: " + this.state.slider.contrast);
  }

  render() {

    var sliderValueBr = this.sliderValueBr;
    var sliderValueCt = this.sliderValueCt;
    return (
      <div>
        <TestImageWrapper />
        <Slider label="Brightness" width="40%" min="0" max="1" step="0.1" initial="0" multiplier="100" sliderValue={sliderValueBr.bind(this)} />
        <Slider label="Contrast" width="40%" min="0" max="10" step="1" initial="0" multiplier="10" sliderValue={sliderValueCt.bind(this)} />
      </div>
    )
  }
}
export default withUniformStore(TestImageComponent);
