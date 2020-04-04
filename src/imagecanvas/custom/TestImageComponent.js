import React from "react";
import TestImageWrapper from "./TestImageWrapper.js";
import SliderComponent from "./SliderComponent.js";
import { undoAnnotation } from "../annotations/fabric/annotationControl.js"

class TestImageComponent extends React.Component {

  render() {
    return (
      <div>
        <button onClick={undoAnnotation}> Undo </button>
        <TestImageWrapper />
        <SliderComponent />
      </div>
    )
  }
}
export default TestImageComponent;
