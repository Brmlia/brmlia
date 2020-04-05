import React from "react";
import TestImageWrapper from "./TestImageWrapper.js";
import SliderComponent from "./SliderComponent.js";

class TestImageComponent extends React.Component {

  render() {
    return (
      <div>
        <TestImageWrapper />
        <SliderComponent />
      </div>
    )
  }
}
export default TestImageComponent;
