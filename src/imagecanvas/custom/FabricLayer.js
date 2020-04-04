import React from "react";
import ReactDOM from "react-dom";
import { fabric } from "fabric";
import { addAnnotation, undoAnnotation, redoAnnotation, getLastAnnotIdx, getLastCachedAnnot, getLastCachedAnnotIdx, deleteCachedAnnotation } from '../annotations/fabric/annotationControl.js'

var canvas;

class FabricLayer extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  drawSampleRect() {
    const rect = {
      left: 100,
      top: 50,
      width: 200,
      height: 100
    }
    const label = 'label'+(getLastAnnotIdx()+1);
    this.drawRect(rect, label)
  }

  drawFreeStyle() {
    window.canvas = canvas;
    canvas.isMouseDown = false;
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.color = "#000";
    canvas.freeDrawingBrush.width = 4;
  }

  drawRect(rect, label) {
    canvas.isDrawingMode = false;
    var fRect = new fabric.Rect({
      fill: 'rgb(0,0,0,0)',
      width: rect.width,
      height: rect.height,
      objectCaching: false,
      stroke: 'darkgreen',
      strokeLineJoin: 'round',
      strokeWidth: 4,
    });

    var text = new fabric.IText(label, {
      fontFamily: 'Arial',
      fontSize: 20,
      fontWeight: 'bold',
      textBackgroundColor: 'darkgreen',
      top: fRect.getScaledHeight() - 1,
      left: 0,
      fill: 'rgb(255, 255, 255)',
      editable: true,
    });

    var group = new fabric.Group([fRect, text], {
      left: 100,
      top: 100
    });


    if (canvas) {
      fRect.perPixelTargetFind = true;
      canvas.add(group);
      canvas.setActiveObject(group);
      addAnnotation(rect, label)
    }
  }

  undo() {
    // remove from canvas
    canvas.getObjects().map(function(o, i) {
      console.log ("i: ", i, " last: ", getLastAnnotIdx())
      if (i == getLastAnnotIdx()) {
        console.log("removing ", i)
        canvas.remove(o);
      }
    })

    // remove from annotations
    undoAnnotation();
    console.log("objects: ", canvas.getObjects().length);
  }

  redo() {
    const idx = getLastCachedAnnotIdx();

    if ( idx >= 0 ) {
      // get last from cache
      const cachedAnnot = getLastCachedAnnot();
      // redraw on canvas
      this.drawRect(cachedAnnot.rect, cachedAnnot.label);
      // remove from cache
      deleteCachedAnnotation(idx);
    }
  }

  componentDidMount() {
    canvas = new fabric.Canvas(this.canvasRef.current);
  }

  render() {
    return (
      <div id="annotationLayer">
        <canvas ref={this.canvasRef}
          width={window.innerWidth}
          height={window.innerHeight}
        />
        <button
          style={{ position: "absolute", zIndex: 1, top: 10, left: 10 }}
          onClick={() => this.drawFreeStyle()}
        >
          Draw Freestyle
        </button>
        <button
          style={{ position: "absolute", zIndex: 1, top: 10, left: 200}}
          onClick={() => this.drawSampleRect()}
        >
          Draw Rect
        </button>
        <button
          style={{ position: "absolute", zIndex: 1, top: 10, left: 400}}
          onClick={() => this.undo()}
        >
          Undo
        </button>
        <button
          style={{ position: "absolute", zIndex: 1, top: 10, left: 600}}
          onClick={() => this.redo()}
        >
          Redo
        </button>
      </div>
    );
  }
}

export default FabricLayer