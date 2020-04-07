import React, { useState } from "react";
import Image from "./TestImage.js";
import { Canvas } from 'react-three-fiber'
import AnnotationLayer from './AnnotationLayer';
import ImageLayer from './ImageLayer';
import FabricLayer from './FabricLayer';
import './TestImageWrapper.css';


export function TestImageWrapper() {
  return (
    <div id="canvasContainer">

      <ImageLayer />
     {/* <AnnotationLayer />*/}
      <FabricLayer />


    </div>
  )
}
export default TestImageWrapper;
