import { fabric } from 'fabric';

import {
  redoAnnotation,
  undoAnnotation,
  addAnnotation,
  getLastAnnotIdx,
  getLastUndoAnnot,
  getLastUndoAnnotIdx,
  updateAnnotationLabel,
  updateAnnotClassLabel,
  getCanvas,
  getDisabledClasses,
} from './index.js';

import { getLastRedoAnnot, getLastRedoAnnotIdx } from './annotationControl.js';

import { annotApi, undoApi, redoApi } from './annotationStore.js';

export const colors = [
  'rgb(200, 140, 140, 0.85)', //channel 1
  'rgb(140, 200, 140, 0.85)', //channel 2
  'rgb(140, 140, 200, 0.85)', //channel 3
  'rgb(100, 100, 100, 0.85)', //dark grey
  'rgb(255, 255, 255, .01)', //transparent (almost)
  'rgb(240, 240, 240, 1)', //light grey
];

export function drawFreeStyle(canvas, color) {
  window.canvas = canvas;
  canvas.isMouseDown = false;

  canvas.isDrawingMode = true;
  canvas.freeDrawingBrush.color = color;
  canvas.freeDrawingBrush.width = 10;
}

export function drawRect(canvas, rect, label, classLabel) {
  if (rect.top <= 0 || rect.left <= 0 || rect.width <= 0 || rect.height <= 0) {
    return;
  }

  var fRect = new fabric.Rect({
    left: parseInt(rect.left),
    top: parseInt(rect.top),
    width: parseInt(rect.width),
    height: parseInt(rect.height),
    fill: colors[4],
    stroke: colors[0],
    strokeLineJoin: 'round',
    strokeWidth: 2,
    objectCaching: false,
  });

  var outerRect = fabric.util.object.clone(fRect);
  outerRect.set({
    left: fRect.left - 1,
    top: fRect.top - 1,
    width: fRect.width + (fRect.strokeWidth * 2 - 1),
    height: fRect.height + (fRect.strokeWidth * 2 - 1),
    stroke: colors[5],
    strokeWidth: 1,
  });

  var group = new fabric.Group([outerRect]);
  group.on('moving', function(e) {
    constrain(e, canvas);
  });

  var text = new fabric.IText(label, {
    fontSize: 14,
    originX: 'left',
    originY: 'top',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fill: 'white',
    textBackgroundColor: colors[0],
    top: group.top + fRect.strokeWidth,
    left: group.left + fRect.strokeWidth,
  });

  const default_class = 'class1';
  var classText = new fabric.IText(classLabel || default_class, {
    fontSize: 16,
    originX: 'left',
    originY: 'bottom',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fill: 'white',
    textBackgroundColor: colors[0],
    top: group.top + group.height - outerRect.strokeWidth,
    left: group.left + fRect.strokeWidth,
  });

  if (canvas) {
    fRect.perPixelTargetFind = true;
    canvas.add(group);
    canvas.setActiveObject(group);
    group.addWithUpdate(text);
    group.addWithUpdate(classText);
    group.addWithUpdate(fRect);
  }

  return group;
}

function constrain(o, canvas) {
  const group = o.target;
  const outerRect = group._objects[3];

  if (group.left < 0) {
    group.set('left', outerRect.strokeWidth / 2);
    group.setCoords();
  } else if (group.left + group.width > canvas.width) {
    group.set('left', canvas.width - group.width - outerRect.strokeWidth / 2);
    group.setCoords();
  }

  if (group.top < 0) {
    group.set('top', outerRect.strokeWidth / 2);
    group.setCoords();
  } else if (group.top + group.height > canvas.height) {
    group.set('top', canvas.height - group.height - outerRect.strokeWidth / 2);
    group.setCoords();
  }
}

export function updateLabel(object, label) {
  var oldLabel = '';
  if (object && label) {
    ungroup(object);

    if (object) {
      var objs = object._objects;
      if (objs && objs.length > 0) {
        for (var i = 0; objs.length; i++) {
          if (objs[i]) {
            if (i === 1) {
              if (objs[i].text) {
                oldLabel = objs[i].text;
                objs[i].text = label;
                updateAnnotationLabel(oldLabel, label);
                getCanvas().renderAll();
                regroup(object);
                return;
              }
            }
          } else {
            return;
          }
        }
      }
    }
  }
}

export function updateClassLabel(object, label) {
  var oldLabel = '';
  if (object && label) {
    ungroup(object);

    if (object) {
      var objs = object._objects;
      if (objs && objs.length > 0) {
        for (var i = 0; objs.length; i++) {
          if (objs[i]) {
            if (i === 2) {
              if (objs[i].text) {
                oldLabel = objs[i].text;
                objs[i].text = label;
                updateAnnotClassLabel(oldLabel, label);
                getCanvas().renderAll();
                regroup(object);
                return;
              }
            }
          } else {
            return;
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
    canvas.remove(object);
    for (var i = 0; i < items.length; i++) {
      canvas.add(items[i]);
      canvas.item(canvas.size() - 1).hasControls = true;
    }
    canvas.renderAll();
  }
}

export function regroup(object) {
  if (object && object._objects.length === 4) {
    var objs = object._objects;

    var outline = objs[0];
    var label = objs[1];
    var classLabel = objs[2];
    var rect = objs[3];

    var group = new fabric.Group([outline, label, classLabel, rect]);
    var canvas = getCanvas();
    if (canvas) {
      canvas.add(group);
      canvas.remove(outline);
      canvas.remove(label);
      canvas.remove(classLabel);
      canvas.remove(rect);
      canvas.setActiveObject(group);
    }
    return group;
  }
}

export function filterClasses(cls) {
  filterAnnotations(cls.name, cls.enabled);
}

export function filterAnnotations(classLabel, enabled) {
  var canvas = getCanvas();
  var objs = canvas.getObjects();
  for (var i = 0; i < objs.length; i++) {
    var group = objs[i];
    if (group) {
      var group_elements = group._objects;
      if (group_elements) {
        var class_element = group._objects[2];
        var label_element = group._objects[1];
        if (class_element && class_element.text) {
          if (class_element.text === classLabel) {
            if (enabled) {
              markGroupVisible(group, label_element.text);
            } else {
              markGroupInvisible(group);
              canvas.discardActiveObject();
            }
          }
        }
      }
    }
  }
  canvas.renderAll();
}

export function filterDisabledClasses() {
  const classes = getDisabledClasses();
  for (var i = 0; i < classes.length; i++) {
    filterAnnotations(classes[i]);
  }
  getCanvas().renderAll();
}

export function showAll() {
  var canvas = getCanvas();
  var objs = canvas.getObjects();
  for (var i = 0; i < objs.length; i++) {
    var group = objs[i];
    if (group) {
      markGroupVisible(group);
    }
  }
}

export function markGroupVisible(group, label) {
  ungroup(group);

  var objs = group._objects;
  for (var i = 0; i < objs.length; i++) {
    var obj = objs[i];
    markVisible(obj, true);
  }

  const newGroup = regroup(group);
  updateGroup(newGroup, label);
}

export function markGroupInvisible(group) {
  ungroup(group);

  var objs = group._objects;
  for (var i = 0; i < objs.length; i++) {
    var obj = objs[i];
    markVisible(obj, false);
  }

  regroup(group);
}

function updateGroup(group, label) {
  var annotations = annotApi.getState().annotations;
  for (let i = 0; i < annotations.length; i++) {
    if (annotations[i].label === label) {
      annotations[i].group = group;
    }
  }
}

function markVisible(obj, visible) {
  obj.visible = visible;
  obj.dirty = true;
  getCanvas().renderAll();
}

export function undo() {
  var canvas = getCanvas();
  const annotations = annotApi.getState().annotations;

  let lastUndoAnno = getLastUndoAnnot();
  for (let i = 0; i < annotations.length; i++) {
    if (lastUndoAnno && annotations[i].id === lastUndoAnno.id) {
      if (annotations[i].group && lastUndoAnno.group) {
        annotations[i].group.set({
          top: lastUndoAnno.rect.top,
          left: lastUndoAnno.rect.left,
          width: lastUndoAnno.rect.width,
          height: lastUndoAnno.rect.height,
          scaleX: lastUndoAnno.rect.scaleX,
          scaleY: lastUndoAnno.rect.scaleY,
        });
        annotations[i].group.setCoords();
        canvas.requestRenderAll();
        canvas.setActiveObject(annotations[i].group);
      } else {
        canvas.remove(annotations[i].group);
      }
      undoAnnotation(i);
    }
  }
  return null;
}

export function redo() {
  var canvas = getCanvas();
  const idx = getLastRedoAnnotIdx();

  if (idx >= 0) {
    // get last from cache
    const redoAnnot = getLastRedoAnnot();

    if (redoAnnot.group) {
      redoAnnot.group.set({
        top: redoAnnot.rect.top,
        left: redoAnnot.rect.left,
        width: redoAnnot.rect.width,
        height: redoAnnot.rect.height,
        scaleX: redoAnnot.rect.scaleX,
        scaleY: redoAnnot.rect.scaleY,
      });
      canvas.add(redoAnnot.group);
      canvas.requestRenderAll();
      canvas.setActiveObject(redoAnnot.group);
    }

    // remove from cache
    redoAnnotation(idx);
  }
}
