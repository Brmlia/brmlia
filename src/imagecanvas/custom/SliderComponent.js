import React from "react";
import TestImageWrapper from "./TestImageWrapper.js";
import Slider from "./../../components/slider.js";
import { withUniformStore } from '../../components/utils.js';

class SliderComponent extends React.Component {

  state = {
    slider: {
      brightness: '0.0',
      contrast: '0.0',
      whitepoint: '235.0',
      blackpoint: '16.0'
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

  updateWhitepoint() {
    if (this.api.getState().uniforms.whitepoint) {
      if (this.state.slider.whitepoint !== this.api.getState().uniforms.whitepoint.value){
        this.api.setState( prevState => ({
          uniforms: {
            ...prevState.uniforms,
            whitepoint: {
              value: this.state.slider.whitepoint
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

  updateBlackpoint() {
    if (this.api.getState().uniforms.blackpoint) {
      if (this.state.slider.blackpoint !== this.api.getState().uniforms.blackpoint.value){
        this.api.setState( prevState => ({
          uniforms: {
            ...prevState.uniforms,
            blackpoint: {
              value: this.state.slider.blackpoint
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
    console.log("sliderValueBr() - ch br: " + this.state.slider.brightness + " uniforms: " + this.api.getState().uniforms.brightness.value);
  }

  sliderValueCt(value) {
    this.setState( prevState => ({
      slider: {
        ...prevState.slider,
        contrast: value
      }
    }));
    this.updateContrast()
    console.log("sliderValueCt() - ch ct: " + this.state.slider.contrast + " uniforms: " + this.api.getState().uniforms.contrast.value);
  }

  sliderValueWp(value) {
    this.setState( prevState => ({
      slider: {
        ...prevState.slider,
        whitepoint: value
      }
    }));
    this.updateWhitepoint()
    console.log("sliderValueWp() - ch wp: " + this.state.slider.whitepoint + " uniforms: " + this.api.getState().uniforms.whitepoint.value);
  }

  sliderValueBp(value) {
    this.setState( prevState => ({
      slider: {
        ...prevState.slider,
        blackpoint: value
      }
    }));
    this.updateBlackpoint()
    console.log("sliderValueBp() - ch bp: " + this.state.slider.blackpoint + " uniforms: " + this.api.getState().uniforms.blackpoint.value);
  }

  render() {


    var sliderValueBr = this.sliderValueBr;
    var sliderValueCt = this.sliderValueCt;
    var sliderValueWp = this.sliderValueWp;
    var sliderValueBp = this.sliderValueBp;
    return (
      <div id="sliderDiv">
      
        <Slider label="Brightnessss" width="40%" min="0" max="1" step="0.1" initial="0" multiplier="100" raw="0"sliderValue={sliderValueBr.bind(this)} />
        <Slider label="Contrast" width="40%" min="0" max="10" step="1" initial="0" multiplier="10" raw="0" sliderValue={sliderValueCt.bind(this)} />
        <Slider label="Whitepoint" width="40%" min="0" max="255" step="1" initial="235" multiplier="1" raw="1" sliderValue={sliderValueWp.bind(this)} />
        <Slider label="Blackpoint" width="40%" min="0" max="255" step="1" initial="16" multiplier="1" raw="1" sliderValue={sliderValueBp.bind(this)} />
      </div>
    )
  }
}
export default withUniformStore(SliderComponent);
