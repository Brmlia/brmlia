import React, { Component } from 'react';
import { useZoomApi } from './zoom/zoomSettings.js';

class Slider extends Component {
  initSlider = {
    initial: 0,
    min: 0,
    max: 0,
    step: 0,
    value: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      updated: false,
      slider: this.initSlider,
      setSlider: null,
      sync: true,
    };
  }

  componentDidUpdate() {
    if (this.state.updated) {
      return true;
    }
    return false;
  }

  updateStatus(status) {
    let updated = true;
    this.setState({ updated: updated });
  }

  notifyValue() {
    var sliderValue = this.props.sliderValue;
    const type = this.props.type;
    sliderValue(this.state.slider.value, type);
  }

  displayValue() {
    if (this.props.raw === '1') {
      return (
        <span>
          {' '}
          {Math.round(this.state.slider.value * this.props.multiplier)}
        </span>
      );
    } else {
      return (
        <span>
          {' '}
          {Math.round(this.state.slider.value * this.props.multiplier)}%
        </span>
      );
    }
  }

  handleSliderChange = e => {
    e.persist();

    let slider = this.state.slider;
    slider.value = e.target.value;
    this.setState({ slider: slider });

    this.updateStatus(true);
    this.notifyValue();
  };

  render() {
    useZoomApi.subscribe(state => {
      if (this.props.type >= 0 && this.props.type < state.views.length) {
        let slider = this.state.slider;
        slider.value = state.views[this.props.type].zoomPct;
        this.setState({ slider: slider });
      }
    });

    const slider = this.state.slider;
    const { label, min, max, initial, step } = this.props;

    return (
      <div className="slider-settings">
        <span>{label}</span> <br></br>
        <span>{min} </span>
        <input
          type="range"
          className="slider"
          value={slider.value || initial}
          id="customRange1"
          initial={initial}
          min={min}
          max={max}
          step={step}
          onChange={e => this.handleSliderChange(e)}
        />
        <span> {max}</span>
        <span> {this.displayValue()}</span>
      </div>
    );
  }
}

export default Slider;
