import { fabric } from "fabric";
import { addAnnotation, undoAnnotation, getLastAnnotIdx, getLastCachedAnnot, getLastCachedAnnotIdx, deleteCachedAnnotation } from './annotationControl.js'

export function drawSampleRect(canvas) {
  const rect = {
    left: 100,
    top: 50,
    width: 200,
    height: 100
  }
  const label = 'label'+(getLastAnnotIdx()+1);
  drawRect(canvas, rect, label)
  addAnnotation(rect, label)
}

export function drawFreeStyle(canvas) {
  window.canvas = canvas;
  canvas.isMouseDown = false;

  canvas.isDrawingMode = true;
  canvas.freeDrawingBrush.color = "#000";
  canvas.freeDrawingBrush.width = 4;
}

export function drawRect(canvas, rect, label) {
  var fRect = new fabric.Rect({
    left: rect.left,
    top: rect.top,
    fill: 'transparent',
    width: rect.width,
    height: rect.height,
    objectCaching: false,
    transparentCorners: false,
    cornerColor: 'blue',
    stroke: 'lightgreen',
    strokeWidth: 4,
    cornerStyle: 'circle'
  });
  var group = new fabric.Group([fRect], {
    left: 100,
    bottom: 100
  });
  var text = new fabric.IText(label, {
    fontSize: 30,
    originX: 'left',
    originY: 'top',
    top: group.height/2+group.bottom,
    left: group.width/2+group.left
  });

  if (canvas) {
    fRect.perPixelTargetFind = true;
    canvas.add(group);
    canvas.setActiveObject(group);
    group.addWithUpdate(text);
  }
}

export function updateRect(rect) {
  // update with new position
}

export function updateLabel(label) {
  // update with new label
}

export function undo(canvas) {
  const idx = getLastAnnotIdx();

  if (idx >= 0) {
    // remove from canvas
    canvas.getObjects().map(function(o, i) {
      if (i === idx) {
        canvas.remove(o);
      }
      return null;
    })

    // remove from annotations
    undoAnnotation();
  }
}

export function redo(canvas) {
  const idx = getLastCachedAnnotIdx();

  if ( idx >= 0 ) {
    // get last from cache
    const cachedAnnot = getLastCachedAnnot();
    // redraw on canvas
    drawRect(canvas, cachedAnnot.rect, cachedAnnot.label);
    // remove from cache
    deleteCachedAnnotation(idx);
  }
}

