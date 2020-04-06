import React from "react";
import { fabric } from "fabric";
import { addAnnotation, undoAnnotation, redoAnnotation, getLastAnnotIdx, getLastCachedAnnot, getLastCachedAnnotIdx, deleteCachedAnnotation } from './annotationControl.js'

export function drawSampleRect(canvas) {
  const rect = {
    left: 100,
    top: 50,
    width: 200,
    height: 100
  }
  const label = 'label'+(getLastAnnotIdx()+1);
  drawRect(canvas, rect, label);
  addAnnotation(rect, label);
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
    width: rect.width,
    height: rect.height,
    fill: 'transparent',
    stroke: 'darkgreen',
    strokeLineJoin: 'round',
    strokeWidth: 4,
    objectCaching: false,
  });

  var group = new fabric.Group([fRect]);
  var text = new fabric.IText(label, {
    fontSize: 30,
    originX: 'left',
    originY: 'top',
    fontFamily: 'Arial',
    fontSize: 20,
    fontWeight: 'bold',
    fill: 'white',
    textBackgroundColor: 'darkgreen',
    top: group.top + group.height - fRect.strokeWidth,
    left: group.left,
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
      if (i == idx) {
        canvas.remove(o);
      }
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

