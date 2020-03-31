import React, { Component } from "react";
import {TestImageWrapper} from "./TestImageWrapper.js"


import Image from "./TestImage.js";
import Annotator from "./ImageDraw.js";

import { Canvas } from 'react-three-fiber';
import Slider from "./../../components/slider.js";
import { withUniformStore } from '../../components/utils.js';

import * as THREE from 'three';

class Annotator2 extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
        image: props.image,
        };

        //var fu = new Image();
    }

    render() {


////////////    flower picture

var img = TestImageWrapper();

console.log(img);
console.log("Image in ImageBare");

console.log(img.props.id);



// var canvas = document.getElementById(img.props.id);
//var canvas = img.props.id;
//var context = canvas.getContext('2d');

var myCanvas = document.createElement('canvas');
myCanvas.width = 256;
myCanvas.height = 256;
console.log(myCanvas);
// canvas.id='canvasJavascript'
// var canvas = this.getElementById("ecanvas");

// document.body.appendChild(canvas);
var ctx = myCanvas.getContext("2d");
console.log(ctx);
ctx.font = "34px serif";
ctx.textAlign = "center";
ctx.textBaseline="middle";
ctx.fillStyle = "#FFF";
ctx.fillText("My Context",150,50);

ctx.strokeRect(100,100,200,200);

var img2 = document.createElement('image');

//img2.drawImage(img);

////////////    flower picture



    return (
        <div>
          <img />
        </div>

      )
    }
};

export default Annotator2;
