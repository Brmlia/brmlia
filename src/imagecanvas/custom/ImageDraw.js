import React, { useState,  useEffect, Component } from "react";
import { ReactPictureAnnotation } from "react-picture-annotation";
import {TestImageWrapper} from "./TestImageWrapper.js"

class Annotator extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
        image: props.image,
        };

        //var fu = new Image();
    }

    render() {

    return ( <ReactPictureAnnotation
        // image="https://data.broadinstitute.org/bbbc/BBBC042/BBBC042_example2.png"
        image={new Image()}
        onSelect={selectedId => console.log(selectedId)}
        onChange={data => console.log(data)}
        width={window.innerWidth}
        height={window.innerHeight}
        style={{
          border: 'solid 2px black'
        }}
      /> );
    }
};

export default Annotator;
