import React from 'react';
import { fabric } from 'fabric';

import AnnotationMenu from '../../annotator/annotationMenu.js';

import {
  filterAnnotations,
  showAll,
  drawFreeStyle,
  colors,
  annotApi,
  setCanvas,
  AnnotationMenuApi,
  openMenu,
  startDrawing,
  startSelecting,
  finish,
  addToFabric,
  setFabricCanvas,
  setMode,
  fabricApi,
  modes,
  annotLayerStyle,
} from './index.js';

import { startMoving, finishMoving } from '../../fabric/fabricControl.js';

var canvas;

class FabricLayer extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseDoubleClick = this.handleMouseDoubleClick.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.selectClass1 = this.selectClass1.bind(this);
    this.showAll = this.showAllClasses.bind(this);
    this.handleMoveAnnotation = this.handleMoveAnnotation.bind(this);
    this.handleModifyAnnotation = this.handleModifyAnnotation.bind(this);
  }

  componentDidMount() {
    canvas = new fabric.Canvas(this.canvasRef.current, {
      fireRightClick: true,
    });
    canvas.on({
      'mouse:down': this.handleMouseDown,
      'mouse:up': this.handleMouseUp,
      'mouse:dblclick': this.handleMouseDoubleClick,
      'object:modified': this.handleModifyAnnotation,
      'object:moving': this.handleMoveAnnotation,
      'object:rotating': this.handleDrag,
      'object:scaling': this.handleDrag,
    });
    setCanvas(canvas);
    setFabricCanvas(canvas);
  }

  handleDrag(e) {
    startSelecting();
  }

  handleMoveAnnotation(e) {
    setMode(modes.SELECT);
  }

  handleModifyAnnotation(options) {
    finishMoving(options.target);
  }

  handleLeftMouseDown(options) {
    const mode = fabricApi.getState().drawMode;
    if (mode === modes.RECT) {
      startDrawing(options.e.clientX, options.e.clientY);
    } else if (mode === modes.FREE) {
      drawFreeStyle(canvas);
    }
  }

  handleRightMouseDown(options) {
    openMenu(options.e.clientX, options.e.clientY);
  }

  handleLeftMouseUp(options) {
    finish(options.e.clientX, options.e.clientY);
  }

  handleRightMouseUp(options) {}

  handleMouseDown(options) {
    if (options.button === 3) {
      this.handleRightMouseDown(options);
    } else {
      this.handleLeftMouseDown(options);
    }
  }

  handleMouseUp(options) {
    if (options.button === 3) {
      this.handleRightMouseUp(options);
    } else {
      this.handleLeftMouseUp(options);
    }
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
    startSelecting();
  }

  displayMenu() {
    if (canvas && canvas.getActiveObjects().length > 0) {
      return <AnnotationMenu />;
    }
  }
  selectClass1() {
    filterAnnotations('class1');
    this.forceUpdate();
  }
  showAllClasses() {
    showAll();
    this.forceUpdate();
  }

  render() {
    annotApi.subscribe(state => {
      if (state) {
        addToFabric(state.annotations, canvas);
      }
    });
    AnnotationMenuApi.subscribe(state => {
      this.forceUpdate();
    });

    return (
      <div
        id="annotationLayer"
        style={annotLayerStyle}
        onContextMenu={e => e.preventDefault()}
      >
        <canvas
          ref={this.canvasRef}
          width={window.innerWidth * 0.6}
          height={window.innerHeight * 0.48}
        />
        {this.displayMenu()}
      </div>
    );
  }
}

export default FabricLayer;
