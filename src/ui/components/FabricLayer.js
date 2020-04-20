import React from 'react';
import { fabric } from 'fabric';
import {
  filterAnnotations,
  showAll,
  drawFreeStyle,
  colors,
} from '../../annotator/editControl.js';
import { annotApi } from '../../annotator/annotationStore.js';
import AnnotationMenu from '../../annotator/annotationMenu.js';
import {
  setCanvas,
  AnnotationMenuApi,
} from '../../annotator/annotationSettings.js';
import {
  openMenu,
  startDrawing,
  startSelecting,
  finish,
  addToFabric,
  setFabricCanvas,
  setMode,
  fabricApi,
  modes,
} from '../../fabric/fabricControl.js';

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
    // this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    canvas = new fabric.Canvas(this.canvasRef.current, {
      fireRightClick: true,
    });
    canvas.on({
      'mouse:down': this.handleMouseDown,
      'mouse:up': this.handleMouseUp,
      'mouse:dblclick': this.handleMouseDoubleClick,
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

  handleLeftMouseDown(options) {
    const mode = fabricApi.getState().drawMode;
    if (mode === modes.RECT) {
      startDrawing(options.e.clientX, options.e.clientY);
    } else if (mode === modes.FREE) {
      drawFreeStyle(canvas, colors[this.props.channel]);
    }
  }

  handleRightMouseDown(options) {
    openMenu(options.e.clientX, options.e.clientY);
  }

  handleLeftMouseUp(options) {
    finish(options.e.clientX, options.e.clientY, colors[this.props.channel]);
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
        addToFabric();
      }
    });
    AnnotationMenuApi.subscribe(state => {
      this.forceUpdate();
    });

    return (
      <div
        className="annotationLayer"
        onContextMenu={e => e.preventDefault()}
        style={{
          borderColor: colors[this.props.channel],
          borderWidth: 2,
          borderStyle: 'solid',
          opacity: this.props.opacity,
          zIndex: this.props.zIndex,
        }}
      >
        <canvas ref={this.canvasRef} width={600} height={600} />
        {this.displayMenu()}
      </div>
    );
  }
}

export default FabricLayer;
