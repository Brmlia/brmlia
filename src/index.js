import React from "react";
import ReactDOM from "react-dom";
import TestImageComponent from "./imagecanvas/custom/TestImageComponent.js"
import TestImageWrapper from "./imagecanvas/custom/TestImageWrapper.js"
import TestImageCatComponent from "./imagecanvas/custom/TestImageCatComponent.js"
import TestReactWrapper from "./imagecanvas/simple/TestReactWrapper.js"

function Application() {
  return (
      <TestImageComponent />
      // <TestImageCatComponent />
      // <TestReactWrapper />
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Application />, rootElement);
