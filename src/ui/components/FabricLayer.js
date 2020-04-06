import React from "react";
import { fabric } from "fabric";
import {drawSampleRect, drawFreeStyle, drawRect, undo, redo} from '../../annotator/editControl.js'
import { annotApi } from '../../annotator/annotationStore.js'

var canvas;

class FabricLayer extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    canvas = new fabric.Canvas(this.canvasRef.current);
  }

  handleMouseDown(e){
    e.persist();
    // get mouse x and y
  }

  handleMouseUp(e){
    e.persist();
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
    annotApi.subscribe(state =>  {
      if (state) {
        let annots = state.annotations;

        if (annots.length > canvas.getObjects().length) {
          let lastAnnotIdx = annots.length-1;
          let annot = annots[lastAnnotIdx];

          var newAnnot = {
            left: parseInt(annot.rect.left),
            top: parseInt(annot.rect.top),
            width: parseInt(annot.rect.width),
            height: parseInt(annot.rect.height)
          }

          drawRect(canvas, newAnnot, annot.label)
        }
      }
    })
    // todo: adjust dimensions to that of parent's
    return (
      <div id="annotationLayer">
        <canvas ref={this.canvasRef}
          width='700px'
          margin='0px'
          height={window.innerHeight}
          id='fabric-canvas'
        />
        <button
          style={{ position: "absolute", zIndex: 1, top: 10, left: 10 }}
          onClick={() => drawFreeStyle(canvas)}
        >
          Draw Freestyle
        </button>
        <button
          style={{ position: "absolute", zIndex: 1, top: 10, left: 200}}
          onClick={() => drawSampleRect(canvas)}
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