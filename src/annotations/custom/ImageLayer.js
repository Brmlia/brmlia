import React from "react";
import Image from "./TestImage.js";
import { Canvas } from 'react-three-fiber'
import './TestImageWrapper.css';

export function ImageLayer() {
  return (
    <div id="imageLayer">
      <Canvas>
        <Image />
      </Canvas>
    </div>
  )
}
export default ImageLayer;
