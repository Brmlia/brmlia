import 'bootstrap/dist/css/bootstrap.min.css';

import React from "react";
import ReactDOM from "react-dom";
import Annotator from "./annotator/index.js"
import ImageCanvas from "./imagecanvas/ImageCanvas.js"
import Thumbnails from "./ui/components/thumbnails.js";
import FabricLayer from "./ui/components/FabricLayer.js";
import SampleTiff from './ui/components/sampleTiff.js'
import './styles.css'


function Application() {
  return (
    <>
      <SampleTiff />
      <Annotator />
      <div id="canvasContainer">
        <ImageCanvas />
        <FabricLayer />
      </div>
      <Thumbnails />
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Application />, rootElement);
