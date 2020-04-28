import React from 'react';

import { Button, UncontrolledCollapse, Card, CardBody } from 'reactstrap';

import ImageCanvas from '../../imagecanvas/ImageCanvas.js';
import Slider from './slider.js';

import {
  settingsApi,
} from '../../mainSettings.js';

import {
  card,
  cardBody,
  canvasThumbnail,
  updateBrightness,
  updateContrast,
  updateWhitepoint,
  updateBlackpoint,
  updateColor,
  updateOpacity,
  updateChannelSel,
  updateLastSel,
} from './index.js';

class Channel extends React.Component {
  updateSelection = () => {
    updateChannelSel(this.props.ch);
    updateLastSel(this.props.ch);
    this.forceUpdate();
  };

  sliderValueBr(value) {
    updateBrightness(value, this.props.ch);
  }

  render() {
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
        height="100px"
        channel={this.props.ch}
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
          <Card style={card}>
            <CardBody style={cardBody}>
              <div style={canvasThumbnail}>{canvas}</div>
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
