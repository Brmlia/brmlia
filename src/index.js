import React from "react";
import ReactDOM from "react-dom";
import TestImageComponent from "./imagecanvas/custom/TestImageComponent.js"

function Application() {
  return (
      <TestImageComponent />
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Application />, rootElement);
