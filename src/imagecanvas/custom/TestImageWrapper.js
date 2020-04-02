import React, { useState } from "react";
import Image from "./TestImage.js";
import { Canvas } from 'react-three-fiber'
import AnnotationLayer from './AnnotationLayer';
import './TestImageWrapper.css';

export function TestImageWrapper() {
  return (
    <div id="canvasContainer">
      <div id="imageLayer">
        <Canvas>
          <Image />
        </Canvas>
      </div>
      <AnnotationLayer />
    </div>
  )
}
export default TestImageWrapper;
