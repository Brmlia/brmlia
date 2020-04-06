import React from "react";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useZoomApi } from "./zoomSettings.js";
// import { updateZppZoom } from "./zoomControl.js";

var state = {
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
    scale: 1,
    x: 0,
    y: 0
  },
  zoomPct: 100,
};

function updateZoomValue(value, idx) {
  if (state.zoomPct !== value) {
    state.zoomPct = value;
    // updateZppZoom(value, idx)

  }
}

function updateZppZoomValue(value, idx) {
  if (state.zoomPct !== value) {
    state.zoomPct = value;
  }
}

function updateXY(x, y) {
  if (state.zpp.x !== x) {
    state.zpp.x = x
  }
  if (state.zpp.y !== y) {
    state.zpp.y = y
  }
}

function reset() {
  state.zpp.x = 0
  state.zpp.y = 0
}

function view(image, imageWidth) {
  if (image !== "") {
    return (
      <img src={image} alt="viewer" width={imageWidth}/>
    )
  }
}

function Zpp (props) {
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
    x,
    y
  } = state.zpp;

  useZoomApi.subscribe(state =>  {
    if (state && state.views && (props.type >= 0) && (props.type < state.views.length)) {
      updateZppZoomValue(state.views[props.type].zoomPct, props.type)
    }

    if (state.views[props.type].reset) reset();
  })

  return (
    <div className="transform-wrapper">
      <TransformWrapper
        defaultScale={1}
        defaultPositionX={0}
        defaultPositionY={0}
        positionX={x}
        positionY={y}
        scale={state.zoomPct/100}
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
        {updateZoomValue(scale*100, props.type)}
        {updateXY(positionX, positionY)}
        <React.Fragment>
          <TransformComponent>
            { view(props.img, props.imageWidth) }
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
    </div>
  );
}

export default Zpp;
