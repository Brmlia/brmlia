import React from "react";

import ImageCanvas from '../../imagecanvas/ImageCanvas.js'

class mainViewer extends React.Component {

  render() {
    return (
      <ImageCanvas className="canvas-view" alt="ch1" height="100px" channel="1" />
    );
  }
}

export default mainViewer;