import React from "react";

import Slider from "../slider.js"

import { useZoomApi } from "./zoomSettings.js";
import { updateZoom } from "./zoomControl.js";

var state = {
  zoomPct: 100
}

function resetZoom(idx) {
  updateZoom("100", idx, true)
}

function updateZoomView(idx, value) {
  if (state.zoomPct !== value) {
    // updateZoom(value, idx);
  }
}

function Zoom(props) {
  useZoomApi.subscribe(state =>  {
    if (state && state.views && (props.type >= 0) && (props.type < state.views.length)) {
      updateZoomView(props.type, state.views[props.type].zoomZppPct)
    }
  })

  return (
    <div className="viewer-wrapper">
      <Slider label="Zoom" width="40%" min="50" max="800" step="10" initial={state.zoomPct} multiplier="1" sliderValue={updateZoom.bind(this)} type={props.type} />
      <button id="resetZoomBtn" onClick={() => {resetZoom(props.type)}}>
        Reset Zoom
      </button>
    </div>
  );
}

export default Zoom;
