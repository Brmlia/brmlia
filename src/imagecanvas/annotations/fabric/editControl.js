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
  const classLabel = "class1";
  drawRect(canvas, rect, label, classLabel);
  addAnnotation(rect, label);
}

export function drawFreeStyle(canvas) {
  window.canvas = canvas;
  canvas.isMouseDown = false;
  canvas.isDrawingMode = true;
  canvas.freeDrawingBrush.color = "#000";
  canvas.freeDrawingBrush.width = 4;
}

export function drawRect(canvas, rect, label, classLabel) {
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

  var classText = new fabric.IText(classLabel, {
    fontSize: 30,
    originX: 'left',
    originY: 'bottom',
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
    group.addWithUpdate(classText);
  }

  addAnnotation(fRect, label, classText);
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
          if ( objs[i] ) {
            if (i === 1) {
              if (objs[i].text) {
                oldLabel = objs[i].text
                objs[i].text = label
                updateAnnotationLabel(oldLabel, label)
                getCanvas().renderAll();
                regroup(object)
                return
              }
            }
          }
          else {
            return
          }
        }
      }
    }
  }
}

export function updateClassLabel(object, label) {

  var oldLabel = ""
  if (object && label) {
    ungroup(object)

    if (object) {
      var objs = object._objects
      if (objs && (objs.length > 0)) {
        for (var i = 0; objs.length; i++) {
          if ( objs[i] ) {
            if (i === 2) {
              if (objs[i].text) {
                oldLabel = objs[i].text
                objs[i].text = label
                updateAnnotationLabel(oldLabel, label)
                getCanvas().renderAll();
                regroup(object)
                return
              }
            }
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
  if (object && (object._objects.length === 3)) {
    var objs = object._objects

    var rect = objs[0]
    var label = objs[1]
    var classLabel = objs[2]

    var group = new fabric.Group([rect, label, classLabel])
    var canvas = getCanvas()
    if (canvas) {
      canvas.add(group)
      canvas.remove(rect)
      canvas.remove(label)
      canvas.remove(classLabel)
      canvas.setActiveObject(group)
    }
  }
}

export function filterAnnotations(classLabel) {
  var canvas = getCanvas();
  var objs = canvas.getObjects();
  for (var i = 0; i < objs.length; i++) {
    var group = objs[i]
    if (group) {
      var group_elements = group._objects
      if (group_elements) {
        var class_element = group._objects[2]
        if (class_element && class_element.text) {
          if (class_element.text !== classLabel) {
            markGroupInvisible(group)
          }
        }
      }
    }
  }
  canvas.renderAll();
}

export function showAll() {
  var canvas = getCanvas();
  var objs = canvas.getObjects();
  for (var i = 0; i < objs.length; i++) {
    var group = objs[i]
    if (group) {
      markGroupVisible(group)
    }
  }
}

export function markGroupVisible(group) {
  ungroup(group)

  var objs = group._objects;
  for (var i = 0; i < objs.length; i++) {
    var obj = objs[i];
    markVisible(obj, true)
  }

  regroup(group)
}

export function markGroupInvisible(group) {
  ungroup(group)

  var objs = group._objects;
  for (var i = 0; i < objs.length; i++) {
    var obj = objs[i];
    markVisible(obj, false)
  }

  regroup(group)
}

function markVisible(obj, visible) {
  obj.visible = visible
  obj.dirty = true
  getCanvas().renderAll();
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
