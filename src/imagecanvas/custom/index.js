import React from "react";
import ReactDOM from "react-dom";
import Scene from "./imagecanvas/Test.js"
import Mesh from "./imagecanvas/TestImage.js"
import TestReactWrapper from "./imagecanvas/TestReactWrapper.js"
import TestFunctionWrapper from "./imagecanvas/TestFunctionWrapper.js"
import TestImageComponent from "./imagecanvas/TestImageComponent.js"
import TestWrapper from "./imagecanvas/tests/TestWrapper.js"
import TestFunctionWrapperWrapper from "./imagecanvas/tests/TestFunctionWrapperWrapper.js"
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';


function Application() {
  return (
    <TestImageComponent />
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Application />, rootElement);
