import { fabric } from "fabric";
import { addAnnotation, undoAnnotation, getLastAnnotIdx, getLastCachedAnnot, getLastCachedAnnotIdx, deleteCachedAnnotation, updateAnnotationLabel } from './annotationControl.js'
import {getCanvas } from '../../custom/FabricMenuSettings.js'

const colors = {red: '#dd9999', green: '#99dd99', purple: '#9999dd'};

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
    stroke: colors.green,
    strokeLineJoin: 'round',
    strokeWidth: 4,
    objectCaching: false,
  });

  var group = new fabric.Group([fRect]);

  label += getLastAnnotIdx() + 1;
  var text = new fabric.IText(label, {
    fontSize: 30,
    originX: 'left',
    originY: 'top',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fill: 'white',
    textBackgroundColor: colors.green,
    top: group.top + group.height - fRect.strokeWidth,
    left: group.left,
  });

  if (canvas) {
    fRect.perPixelTargetFind = true;
    canvas.add(group);
    canvas.setActiveObject(group);
    group.addWithUpdate(text);
  }

  addAnnotation(fRect, label);
}

export function updateRect(rect) {
  // update with new position
}

export function updateLabel(object, label) {

  var oldLabel = ""
  if (object && label) {
    ungroup(object)

    if (object) {
      var objs = object._objects
      if (objs && (objs.length > 0)) {
        for (var i = 0; objs.length; i++) {
          if (objs[i]) {
            if (objs[i].text) {
              oldLabel = objs[i].text
              objs[i].text = label
              updateAnnotationLabel(oldLabel, label)
              getCanvas().renderAll();            }
          }
          else {
            return
          }
        }
      }
    }
  }
}

export function ungroup(object) {
  var canvas = getCanvas();
  var items = object._objects;
  if (items.length >= 2) {
    object._restoreObjectsState();
    canvas.remove(object)
    for (var i = 0; i < items.length; i++) {
      canvas.add(items[i]);
      canvas.item(canvas.size()-1).hasControls=true;
    }
    canvas.renderAll();
  }
}

export function regroup(object) {
}

export function undo(canvas) {
  const idx = getLastAnnotIdx();

  if (idx >= 0) {
    // remove from canvas
    canvas.getObjects().map(function(o, i) {
      if (i === idx) {
        canvas.remove(o);
      }
      return null
    })

    // remove from annotations
    undoAnnotation();
  }
  return null
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
