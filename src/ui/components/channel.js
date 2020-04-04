import React from 'react';

import { card, cardBody, canvasThumbnail } from '../style.js';
import {
  Button,
  UncontrolledCollapse,
  Card,
  CardBody,
} from 'reactstrap';

import ImageCanvas from '../../imagecanvas/ImageCanvas.js'
import { withUniformStore } from '../../utils/index.js'
import Slider from "./slider.js"
import { updateBrightness, updateContrast, updateWhitepoint, updateBlackpoint } from '../../imagecanvas/CanvasControl.js'
import {canvasApi} from '../../imagecanvas/canvasStore.js'
import {updateChannelSel, updateLastSel, settingsApi} from '../../mainSettings.js'

class Channel extends React.Component {

  updateSelection = () => {
    updateChannelSel(this.props.ch)
    updateLastSel(this.props.ch)
    this.forceUpdate()
  }

  sliderValueBr(value) {
    updateBrightness(value, this.props.ch)
  }

  sliderValueCt(value) {
    updateContrast(value, this.props.ch)
  }

  sliderValueWp(value) {
    updateWhitepoint(value, this.props.ch)
  }

  sliderValueBp(value) {
    updateBlackpoint(value, this.props.ch)
  }

  resetBrightness() {
    updateBrightness('0.0', this.props.ch);
  }

  resetContrast() {
    updateContrast('0.0', this.props.ch);
  }

  resetWhitepoint() {
    updateWhitepoint('255.0', this.props.ch);
  }

  resetBlackpoint() {
    updateBlackpoint('0.0', this.props.ch);
  }

  render() {
    var sliderValueBr = this.sliderValueBr;
    var sliderValueCt = this.sliderValueCt;
    var sliderValueWp = this.sliderValueWp;
    var sliderValueBp = this.sliderValueBp;
    var canvas = <ImageCanvas className="annot-view" alt="Ch`${this.props.ch}` Histogram" height="100px" channel={this.props.ch}/>
    var sel = settingsApi.getState().channels[this.props.ch-1].selected

    console.log("Channel " + this.props.ch + " : " + sel);
    return (
      <div>
        <Button className="channelBtn" outline color="primary" id="channel-btn" onClick={() => { this.updateSelection() }} active={sel}>
          Channel {`${this.props.ch}`}
        </Button>
        <Button className="viewBtn" outline color="secondary" id={`view${this.props.ch}`}>
          View
        </Button>
       <UncontrolledCollapse toggler={`#view${this.props.ch}`}>
          <Card style={card} >
            <CardBody style={cardBody} >
              <div style={canvasThumbnail}>
                {canvas}
              </div>
              "Insert Look up table here"
              <br>
              </br>
              <br>
              </br>
              <div className="brightness-slider-container">
                <Slider label="Brightness" width="40%" min="0" max="1" step="0.1" initial="0" multiplier="100" raw="0" sliderValue={sliderValueBr.bind(this)} />
                <button id="resetBrBtn" onClick={() => {this.resetBrightness()}}>
                  Reset Brightness
                </button>
              </div>
              <div className="contrast-slider-container">
                <Slider label="Contrast" width="40%" min="0" max="10" step="1" initial="0" multiplier="10" raw="0" sliderValue={sliderValueCt.bind(this)} />
                <button id="resetCtBtn" onClick={() => {this.resetContrast()}}>
                  Reset Contrast
                </button>
              </div>
              <div className="whitepoint-slider-container">
                <Slider label="Whitepoint" width="40%" min="0" max="255" step="1" initial="255" multiplier="1" raw="1" sliderValue={sliderValueWp.bind(this)} />
                <button id="resetWpBtn" onClick={() => {this.resetWhitepoint()}}>
                  Reset Whitepoint
                </button>
              </div>
              <div className="blackpoint-slider-container">
                <Slider label="Blackpoint" width="40%" min="0" max="255" step="1" initial="0" multiplier="1" raw="1" sliderValue={sliderValueBp.bind(this)} />
                <button id="resetBpBtn" onClick={() => {this.resetBlackpoint()}}>
                  Reset Blackpoint
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