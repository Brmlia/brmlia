import React from "react";
import ReactDOM from "react-dom";
import { fabric } from "fabric";
import {drawSampleRect, drawFreeStyle, drawRect, undo, redo} from '../annotations/fabric/editControl.js'

var canvas;

const modes = {
    RECT: 'rectangle',
    FREE: 'free draw',
    SELECT: 'select'
}


class FabricLayer extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();

    this.state = {
      mousedown: false,
      mousex: 0,
      mousey: 0,
      canvasx: 0,
      canvasy: 0,
      mode: modes.RECT
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.setMode = this.setMode.bind(this);
  }

  componentDidMount() {
    canvas = new fabric.Canvas(this.canvasRef.current);
    canvas.on('mouse:down', this.handleMouseDown);
    canvas.on('mouse:up', this.handleMouseUp);
    // canvas.on('selection:created', this.setMode(modes.SELECT));
  }

  setMode(newMode) {
    this.setState({mode: newMode});
  }

  handleMouseDown(options) {
    console.log(this.state);
    if (!canvas.isDrawingMode) {
        this.setState({
        lastMousex: options.e.clientX,
        lastMousey: options.e.clientY,
        mousex: options.e.clientX,
        mousey: options.e.clientY,
      });
    }
  }


  handleMouseUp(options){
    this.setState({
      mousex: options.e.clientX,
      mousey: options.e.clientY
    });
    
    // console.log(this.state);
    if (this.state.lastMousex && this.state.lastMousey && this.state.mode === modes.RECT) {
      const rect = {
        width: this.state.mousex - this.state.lastMousex, 
        height: this.state.mousey - this.state.lastMousey, 
        top: this.state.lastMousey, 
        left:this.state.lastMousex, 
      };
      drawRect(canvas, rect, 'label');
      this.setState({mode: modes.SELECT});
      // drawSampleRect(canvas);
    }
    

    // if there is a last mouse x and y
      // get width and height by computing the x and y from mouse down
      // draw rectangle
      // add to annotations
  }

  handleObjectSelect(e) {
    // if more than one object is selected
      // if Delete button is selected
        // delete all objects from canvas
        // remove from annotations
  }

  handleObjectResize(e) {
    // if an object is selected, and resized
      // updateRect(rect)
  }

  handleMouseDoubleClick(e) {
    // if an object is selected
      // updateLabel (label)
  }

  
  render() {
    return (
      <div id="annotationLayer" 
      >
        <canvas ref={this.canvasRef}
          width={window.innerWidth}
          height={window.innerHeight}
        />
        <button
          style={{ position: "absolute", zIndex: 1, top: 10, left: 10 }}
          onClick={() => this.setState({mode: modes.FREE})}
        >
          Draw Freestyle
        </button>
        <button
          style={{ position: "absolute", zIndex: 1, top: 10, left: 200}}
          onClick={() => this.setState({mode: modes.RECT})}
        >
          Draw Rect
        </button>
        <button
          style={{ position: "absolute", zIndex: 1, top: 10, left: 400}}
          onClick={() => undo(canvas)}
        >
          Undo
        </button>
        <button
          style={{ position: "absolute", zIndex: 1, top: 10, left: 600}}
          onClick={() => redo(canvas)}
        >
          Redo
        </button>
      </div>
    );
  }
}

export default FabricLayer
