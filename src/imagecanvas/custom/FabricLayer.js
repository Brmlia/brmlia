import React from "react";
import { fabric } from "fabric";
import {drawRect, undo, redo} from '../annotations/fabric/editControl.js'
import FabricMenu from './FabricMenu.js'
import {setCanvas, isDisplayOn, setDisplay, setCoords, setSelectedObjects} from "./FabricMenuSettings.js"
import { annotApi } from '../annotations/fabric/annotationStore.js'

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
      mode: modes.RECT,
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseDoubleClick = this.handleMouseDoubleClick.bind(this);
    this.handleDrag = this.handleDrag.bind(this);

    this.fabricMenu = <FabricMenu />;
  }

  componentDidMount() {
    canvas = new fabric.Canvas(this.canvasRef.current, {
      fireRightClick: true
    });
    canvas.on({
      'mouse:down': this.handleMouseDown,
      'mouse:up': this.handleMouseUp,
      'mouse:dblclick': this.handleMouseDoubleClick,
      'object:moving': this.handleDrag,
      'object:rotating': this.handleDrag,
      'object:scaling': this.handleDrag,
    });
    setCanvas(canvas);
  }

  setMode(newMode) {
    this.setState( prevState => ({
      ...prevState,
      mode: newMode
    }));

    if (newMode === modes.FREE) {
      canvas.isDrawingMode = true;
    }
    else {
      canvas.isDrawingMode = false;
    }

    if (newMode === modes.SELECT) {
      this.handleObjectSelect(null)
    }
  }

  setOrigin(mouseEvt) {
    this.setState({
      lastMousex: mouseEvt.clientX,
      lastMousey: mouseEvt.clientY,
      mousex: mouseEvt.clientX,
      mousey: mouseEvt.clientY,
    });
  }

  setNewCoordinates(options) {
    let x = options.e.clientX;
    let y = options.e.clientY;
    let canvasLeft = canvas._offset.left;
    let canvasRight = canvas._offset.left + canvas.width;
    let canvasTop = canvas._offset.top;
    let canvasBottom = canvas._offset.top + canvas.height;

    this.setState({
      mousex: x < canvasLeft ? canvasLeft : (x > canvasRight ? canvasRight - 15 : x),
      mousey: y < canvasTop ? canvasTop : (y > canvasBottom ? canvasBottom - 15 : y),
    });
  }

  handleDrag(e){
    this.setMode(modes.SELECT);
  }

  handleLeftMouseDown(options) {
    this.setMode(modes.RECT);
    if (!canvas.isDrawingMode) {
      this.setOrigin(options.e)
    }
  }

  handleRightMouseDown(options) {
    this.setOrigin(options.e)
    if (!isDisplayOn()) {
      setDisplay(true);
    }
    setCoords(this.state.mousex, this.state.mousey)
  }

  handleLeftMouseUp(options) {
    this.setNewCoordinates(options);

    if (this.state.lastMousex && this.state.lastMousey && this.state.mode === modes.RECT) {
      const rect = {
        width: this.state.mousex - this.state.lastMousex,
        height: this.state.mousey - this.state.lastMousey,
        top: this.state.lastMousey,
        left:this.state.lastMousex,
      };
      drawRect(canvas, rect, 'label');
      this.setMode(modes.SELECT);
    }
  }

  handleRightMouseUp(options) {
  }

  handleMouseDown(options) {
    if (options.button === 3) {
      this.handleRightMouseDown(options)
    }
    else {
      this.handleLeftMouseDown(options)
    }
  }

  handleMouseUp(options){
    // if there is a last mouse x and y
      // get width and height by computing the x and y from mouse down
      // draw rectangle
      // add to annotations
    if (options.button === 3) {
      this.handleRightMouseUp(options)
    }
    else {
      this.handleLeftMouseUp(options)
    }
  }

  handleObjectSelect(e) {
    // setSelectedObjects(canvas.getActiveObjects()[0]._objects)
    setSelectedObjects(canvas.getActiveObjects()[0])
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
    this.setMode(modes.SELECT)
  }

  displayMenu() {
    if (canvas && (canvas.getActiveObjects().length > 0)) {
      return(
        this.fabricMenu
      )
    }
  }

  render() {
    annotApi.subscribe(state => {
      this.forceUpdate();
    })

    return (
      <div id="annotationLayer" onContextMenu={(e) => e.preventDefault()}
      >
        <canvas ref={this.canvasRef}
          width={750}
          height={750}
        />
        <button
          style={{ position: "absolute", zIndex: 1, top: 10, left: 10 }}
          onClick={(e) => this.setMode(modes.FREE, e)}
        >
          Draw Freestyle
        </button>
        <button
          style={{ position: "absolute", zIndex: 1, top: 10, left: 200}}
          onClick={(e) => this.setMode(modes.RECT, e)}
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
        {this.displayMenu()}
      </div>
    );
  }
}

export default FabricLayer
