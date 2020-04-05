import React from "react";
import ImageLayer from './ImageLayer';
import FabricLayer from './FabricLayer';
import './TestImageWrapper.css';

export function TestImageWrapper() {
  return (
    <div id="canvasContainer">
      <ImageLayer />
      <FabricLayer />
    </div>
  )
}
export default TestImageWrapper;
