import { fabric } from 'fabric';

import {
  redoAnnotation,
  undoAnnotation,
  addAnnotation,
  getLastUndoAnnot,
  updateAnnotationLabel,
  updateAnnotClassLabel,
  getCanvas,
  getDisabledClasses,
  getSelectedObjects,
  getAnnotationByLabel,
} from './index.js';

import {
  getLastRedoAnnot,
  getLastRedoAnnotIdx,
  deleteAnnotation,
  addAnnotationToUndoState,
  deleteUndoAnnotation,
} from './annotationControl.js';

import { annotApi, undoApi } from './annotationStore.js';

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
  canvas.freeDrawingBrush.color = colors[0];
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

export function updateLabel(obj, label) {
  var object = obj
  if (!object) {
    object = getSelectedObjects();
  }

  var oldLabel = '';
  if (object && label) {
    var objs = object._objects;
    if (objs && objs.length > 0) {
      ungroup(object);
      for (var i = 0; objs.length; i++) {
        if (objs[i]) {
          if (i === 1) {
            if (objs[i].text) {
              oldLabel = objs[i].text;
              objs[i].text = label;
              updateAnnotationLabel(oldLabel, label);
              getCanvas().renderAll();
              const newGroup = regroup(object);
              updateGroup(newGroup, label);
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

export function updateClassLabel(obj, label) {
  var object = obj
  if (!object) {
    object = getSelectedObjects();
  }

  var oldLabel = '';
  if (object && label) {
    var objs = object._objects;
    if (objs && objs.length > 0) {
      ungroup(object);
      for (var i = 0; objs.length; i++) {
        if (objs[i]) {
          if (i === 2) {
            if (objs[i].text) {
              oldLabel = objs[i].text;
              objs[i].text = label;
              updateAnnotClassLabel(oldLabel, label);
              getCanvas().renderAll();
              const newGroup = regroup(object);
              updateGroup(newGroup, objs[1].text);
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

export function delAnnot(annotation) {
  var annot = annotation
  if (!annotation) {
    const obj = getSelectedObjects();
    if (obj && obj._objects.length > 0) {
      const label = obj._objects[1].text
      const tAnnot = getAnnotationByLabel(label)
      if (tAnnot) {
        annot = {"id": tAnnot.id}
      }
    }
  }

  const annotations = annotApi.getState().annotations;
  const undoAnnotations = undoApi.getState().undoAnnotations;
  let idxToRemoveFromUndo = null;
  let idxToRemoveFromAnnotations = null;

  for (let i = 0; i < annotations.length; i++) {
    if (annot && annotations[i] && (annotations[i].id === annot.id)) {
      removeFromCanvas(annotations[i]);
      idxToRemoveFromUndo = i;
    }
    if (annot && undoAnnotations[i] && (undoAnnotations[i].id === annot.id)) {
      idxToRemoveFromAnnotations = i;
    }
  }

  addAnnotationToUndoState(annotations[idxToRemoveFromUndo]);
  addAnnotation(undoAnnotations[idxToRemoveFromAnnotations]);
  deleteAnnotation(idxToRemoveFromUndo);
  deleteUndoAnnotation(idxToRemoveFromAnnotations);
  return null;
}

function moveAnnotation(annotationTo, annotationFrom) {
  var canvas = getCanvas();

  annotationTo.group.set({
    top: annotationFrom.rect.top,
    left: annotationFrom.rect.left,
    width: annotationFrom.rect.width,
    height: annotationFrom.rect.height,
    scaleX: annotationFrom.rect.scaleX,
    scaleY: annotationFrom.rect.scaleY,
  });
  annotationTo.group.setCoords();
  canvas.requestRenderAll();
  canvas.setActiveObject(annotationTo.group);
}

function removeFromCanvas(annotation) {
  var canvas = getCanvas();
  canvas.remove(annotation.group);
  canvas.requestRenderAll();
}

export function undo() {
  var canvas = getCanvas();
  const annotations = annotApi.getState().annotations;
  let lastUndoAnno = getLastUndoAnnot();

  if (!lastUndoAnno) {
    return null;
  }

  for (let i = 0; i < annotations.length; i++) {
    if (annotations[i] && lastUndoAnno && annotations[i].id === lastUndoAnno.id) {
      if (annotations[i].group && lastUndoAnno.group) {
        moveAnnotation(annotations[i], lastUndoAnno);
      } else if (lastUndoAnno.group && !annotations[i].group) {
        canvas.add(lastUndoAnno.group);
      } else {
        removeFromCanvas(annotations[i]);
      }
      undoAnnotation(i);
    }
  }
}

export function redo() {
  var canvas = getCanvas();
  const idx = getLastRedoAnnotIdx();
  const annotations = annotApi.getState().annotations;

  if (idx >= 0) {
    // get last from cache
    const redoAnnot = getLastRedoAnnot();

    if (!redoAnnot) {
      return null;
    }

    if (redoAnnot.group) {
      redoAnnot.group.set({
        top: redoAnnot.rect.top,
        left: redoAnnot.rect.left,
        width: redoAnnot.rect.width,
        height: redoAnnot.rect.height,
        scaleX: redoAnnot.rect.scaleX,
        scaleY: redoAnnot.rect.scaleY,
      });
      // remove previous annotation before adding back (if any)
      const objs = getCanvas()._objects
      for (var j = 0; j < objs.length; j++) {
        if (objs[j] && objs[j]._objects && objs[j]._objects[1].text && (objs[j]._objects[1].text === redoAnnot.label)) {
          canvas.remove(objs[j])
        }
      }
      canvas.add(redoAnnot.group);
      canvas.requestRenderAll();
      canvas.setActiveObject(redoAnnot.group);
    } else {
      for (let i = 0; i < annotations.length; i++) {
        if (annotations[i].id === redoAnnot.id) {
          canvas.add(annotations[i].group);
          canvas.requestRenderAll();
        }
      }
    }

    // remove from cache
    redoAnnotation(idx);
  }
}
