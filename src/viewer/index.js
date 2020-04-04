import React, { Component } from "react";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Slider from "../ui/components/slider.js"
import {withFileStore} from "../utils/index.js";
import "../styles.css"

// var prevPct = 0;
// var zoomPct = 100;
// var image = {
//   src: "",
//   name: "",
//   style: {},
//   x: 0,
//   y: 0
// };
// var selected = 0;

class Viewer extends Component {

  constructor (props) {
    super(props);
    this.sliderValue.bind(this);
    this.updateZoomValue.bind(this);
  }

  state = {
    zpp: {
      type: true,
      limitToBounds: true,
      panningEnabled: true,
      transformEnabled: true,
      pinchEnabled: false,
      limitToWrapper: false,
      disabled: false,
      dbClickEnabled: true,
      lockAxisX: false,
      lockAxisY: false,
      velocityEqualToMove: true,
      enableWheel: true,
      enableTouchPadPinch: false,
      enableVelocity: true,
      limitsOnWheel: false,
      minScale: 0.5,
      maxScale: 8,
      step: 10,
      updated: false,
      scale: 1
    },
    slider: {
      sync: false,
      updated: false
    },
    zoomPct: 1,
    prevPct: 0,
    image: {
      src: "",
      name: "",
      style: {},
      x: 0,
      y: 0
    },
    selected: 0
  };

  sliderValue(value, isUpdated, isSynced) {
    this.setState({zoomPct: value/100});
    this.setState({slider: {updated: isUpdated}});
    this.setState({slider: {sync: isSynced}});
  }

  updateZoomValue(value) {
    if (this.state.zoomPct !== this.state.prevPct) {
      this.state.prevPct = this.state.zoomPct;
      this.state.zoomPct = value/100;
    }
  }

  update(state) {
    if (state && state.file.length > 0) {
      if ( (this.state.image.name !== state.file[state.selected].name)
        || (this.state.selected !== state.selected)
      ) {
        this.state.image.name = state.file[state.selected].name
        this.state.image.src = state.file[state.selected].image
        this.state.image.style = state.file[state.selected].style
        this.state.selected = state.selected
        this.forceUpdate();
      }
    }
  }

  resetZoom() {
    this.setState( prevState => (
    {
      ...prevState,
      zoomPct: 1,
      image: {
        ...prevState.image,
        x: 0,
        y: 0
      }
    }));
  }

  view() {
    this.update(this.props.api.getState());
    if (this.state.image.src !== "") {
      return (
        <img src={this.state.image.src} alt="viewer" width={this.props.imageWidth}/>
      )
    }
  }

  render() {
    this.props.api.subscribe(state =>  {
      this.update(state);
    })

    const {
      limitToBounds,
      panningEnabled,
      transformEnabled,
      pinchEnabled,
      limitToWrapper,
      disabled,
      dbClickEnabled,
      lockAxisX,
      lockAxisY,
      velocityEqualToMove,
      enableWheel,
      enableTouchPadPinch,
      enableVelocity,
      limitsOnWheel,
      minScale,
      maxScale,
      step,
      scale
    } = this.state.zpp;
    var sliderValue = this.sliderValue;
    if (this.state.zoomPct === 0.01) {
      this.state.zoomPct = scale;
    }

    return (
      <div className="viewer-wrapper">
        <TransformWrapper
          defaultScale={1}
          defaultPositionX={0}
          defaultPositionY={0}
          positionX={this.state.image.x}
          positionY={this.state.image.y}
          scale={this.state.zoomPct}
          options={{
            limitToBounds,
            transformEnabled,
            disabled,
            limitToWrapper,
            minScale,
            maxScale
          }}
          pan={{
            disabled: !panningEnabled,
            lockAxisX,
            lockAxisY,
            velocityEqualToMove,
            velocity: enableVelocity,
          }}
          pinch={{ disabled: !pinchEnabled }}
          doubleClick={{ disabled: !dbClickEnabled }}
          wheel={{
            wheelEnabled: enableWheel,
            touchPadEnabled: enableTouchPadPinch,
            limitsOnWheel,
            step: step
          }}
        >
        {({
          zoomIn,
          zoomOut,
          resetTransform,
          setDefaultState,
          positionX,
          positionY,
          scale,
          previousScale,
          options: { limitToBounds, transformEnabled, disabled },
          ...rest
        }) => (
        <div>
          {this.updateZoomValue(scale)}
          <React.Fragment>
            <TransformComponent>
              { this.view() }
            </TransformComponent>
            <span className="badge badge-primary">
              x : {Number(positionX).toFixed(0)}px
            </span>
            <span className="badge badge-primary">
              y : {Number(positionY).toFixed(0)}px
            </span>
            <span className="badge badge-primary">
              Scale : {Number(scale*100).toFixed(0)}%
            </span>
          </React.Fragment>
          </div>
          )
        }
        </TransformWrapper>
        <Slider label="Zoom" width="40%" min="50" max="800" step="10" initial={this.state.zoomPct} multiplier="1" sliderValue={sliderValue.bind(this)} newValue={this.state.zoomPct} sync={this.state.slider.sync} />
        <button id="resetZoomBtn" onClick={() => {this.resetZoom()}}>
          Reset Zoom
        </button>
      </div>
    );
  }
}

export default withFileStore(Viewer);