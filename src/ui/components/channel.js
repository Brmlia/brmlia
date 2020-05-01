import React from 'react';

import { Button, UncontrolledCollapse, Card, CardBody } from 'reactstrap';

import ImageCanvas from '../../imagecanvas/ImageCanvas.js';
import Slider from './slider.js';

import {
  settingsApi,
} from '../../mainSettings.js';

import {
  volApi,
  updateBrightness,
  updateContrast,
  updateWhitepoint,
  updateBlackpoint,
  updateColor,
  updateOpacity,
  updateChannelSel,
  updateLastSel,
  channelCardStyle,
  channelCardBodyStyle,
  channelCanvasStyle,
  channelImageCanvasStyle,
  updateSliceIndex,
} from './index.js';

class Channel extends React.Component {

  componentDidMount() {
    this.channelSliceIdx = 0;
    this.channelSliceLen = 0;
  }

  updateSelection = () => {
    updateChannelSel(this.props.ch);
    updateLastSel(this.props.ch);
    this.forceUpdate();
  };

  sliderValueSlice(value) {
    updateSliceIndex((parseInt(this.props.ch) + 3), value)
  }

  resetBrightness() {
    updateBrightness('0.0', this.props.ch);
  }

  sliderValueBr(value) {
    updateBrightness(value, this.props.ch);
  }

  updateForSliceLen(state) {
    const len = state.lengths[parseInt(this.props.ch)+3]
    if (this.channelSliceLen !== len) {
      this.channelSliceLen = len
      this.forceUpdate()
    }
  }

  render() {
    volApi.subscribe(state => {
      this.updateForSliceLen(state);
    });

    var sliderValueBr = this.sliderValueBr;
    var sliderValueCt = this.sliderValueCt;
    var sliderValueWp = this.sliderValueWp;
    var sliderValueBp = this.sliderValueBp;
    var sliderValueOpc = this.sliderValueOpc;
    var colorValue = this.colorValue;

    var alt = 'Ch' + this.props.ch + ' Histogram';
    var canvas = (
      <ImageCanvas
        className="annot-view"
        alt={alt}
        height="200px"
        channel={this.props.ch}
        style={channelImageCanvasStyle}
      />
    );
    var sel = settingsApi.getState().channels[this.props.ch - 1].selected;

    console.log('Channel ' + this.props.ch + ' : ' + sel);
    return (
      <div>
        <Button
          className="channelBtn"
          outline
          color="primary"
          id="channel-btn"
          onClick={() => {
            this.updateSelection();
          }}
          active={sel}
        >
          Channel {`${this.props.ch}`}
        </Button>
        &nbsp;
        <Button
          className="viewBtn"
          outline
          color="secondary"
          id={`view${this.props.ch}`}
        >
          View
        </Button>
        <UncontrolledCollapse toggler={`#view${this.props.ch}`}>
          <Card style={channelCardStyle}>
            <CardBody style={channelCardBodyStyle}>
              <div style={channelCanvasStyle}>{canvas}</div>
              <div className="slice-slider-container">
                <Slider
                  label=""
                  width="40%"
                  min="0"
                  max={Math.max(this.channelSliceLen - 1, 0)}
                  step="1"
                  initial="0"
                  multiplier="1"
                  raw="1"
                  sliderValue={this.sliderValueSlice.bind(this)}
                />
              </div>
              <div> Slice: {this.channelSliceIdx} </div>
              <div className="brightness-slider-container">
                <Slider
                  label="Brightness"
                  width="40%"
                  min="0"
                  max="1"
                  step="0.1"
                  initial="0"
                  multiplier="100"
                  raw="0"
                  sliderValue={sliderValueBr.bind(this)}
                />
                <button
                  id="resetBrBtn"
                  onClick={() => {
                    this.resetBrightness();
                  }}
                >
                  Reset Brightness
                </button>
              </div>
            </CardBody>
          </Card>
        </UncontrolledCollapse>
      </div>
    );
  }
}

export default Channel;
