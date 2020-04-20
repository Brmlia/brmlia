import { fabric } from 'fabric';
import {
  addAnnotation,
  undoAnnotation,
  getLastAnnotIdx,
  getLastCachedAnnot,
  getLastCachedAnnotIdx,
  deleteCachedAnnotation,
  updateAnnotationLabel,
  updateAnnotClassLabel,
} from './annotationControl.js';
import { getCanvas } from './annotationSettings.js';
import { getDisabledClasses } from './annotationClass.js';

export const colors = [
  'rgb(200, 140, 140, 0.85)', //channel 1
  'rgb(140, 200, 140, 0.85)', //channel 2
  'rgb(140, 140, 200, 0.85)', //channel 3
  'rgb(215, 215, 215, 0.85)', //light grey
  'rgb(255, 255, 255, .01)', //transparent (almost)
  'rgb(240, 240, 240, 1)', //lighter grey
];

export function drawFreeStyle(canvas, color) {
  window.canvas = canvas;
  canvas.isMouseDown = false;

  canvas.isDrawingMode = true;
  canvas.freeDrawingBrush.color = color;
  canvas.freeDrawingBrush.width = 10;
}

export function drawRect(canvas, rect, label, classLabel) {
  var color = rect.color ? rect.color : rect._objects[0].stroke;

  var fRect = new fabric.Rect({
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
    fill: colors[4],
    stroke: color,
    strokeLineJoin: 'round',
    strokeWidth: 2,
    objectCaching: false,
  });

  var outerRect = fabric.util.object.clone(fRect);
  outerRect.set({ strokeWidth: fRect.strokeWidth + 1, stroke: colors[5] });

  var group = new fabric.Group([outerRect]);
  group.on('moving', function(e) {
    constrain(e, canvas);
  });

  var newLabel = label === 'label' ? (label += getLastAnnotIdx() + 1) : label;

  var text = new fabric.IText(newLabel, {
    fontSize: 16,
    originX: 'left',
    originY: 'top',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fill: colors[5],
    textBackgroundColor: color,
    top: group.top + outerRect.strokeWidth,
    left: group.left + outerRect.strokeWidth,
  });

  var classText = new fabric.IText(classLabel, {
    fontSize: 16,
    originX: 'left',
    originY: 'bottom',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fill: colors[5],
    textBackgroundColor: color,
    top: group.top + group.height - outerRect.strokeWidth,
    left: group.left + outerRect.strokeWidth,
  });

  if (canvas) {
    fRect.perPixelTargetFind = true;
    canvas.add(group);
    canvas.setActiveObject(group);
    group.addWithUpdate(text);
    group.addWithUpdate(classText);
    group.addWithUpdate(fRect);
    addAnnotation(group, newLabel, classLabel);
  }
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
  if (object && object._objects.length === 3) {
    var objs = object._objects;

    var rect = objs[0];
    var label = objs[1];
    var classLabel = objs[2];

    var group = new fabric.Group([rect, label, classLabel]);
    var canvas = getCanvas();
    if (canvas) {
      canvas.add(group);
      canvas.remove(rect);
      canvas.remove(label);
      canvas.remove(classLabel);
      canvas.setActiveObject(group);
    }
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
        if (class_element && class_element.text) {
          if (class_element.text === classLabel) {
            if (enabled) {
              markGroupVisible(group);
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

export function markGroupVisible(group) {
  ungroup(group);

  var objs = group._objects;
  for (var i = 0; i < objs.length; i++) {
    var obj = objs[i];
    markVisible(obj, true);
  }

  regroup(group);
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

function markVisible(obj, visible) {
  obj.visible = visible;
  obj.dirty = true;
  getCanvas().renderAll();
}

export function undo() {
  var canvas = getCanvas();
  const idx = getLastAnnotIdx();

  if (idx >= 0) {
    // remove from canvas
    canvas.getObjects().map(function(o, i) {
      if (i === idx) {
        canvas.remove(o);
      }
      return null;
    });

    // remove from annotations
    undoAnnotation();
  }
  return null;
}

export function redo() {
  var canvas = getCanvas();
  const idx = getLastCachedAnnotIdx();

  if (idx >= 0) {
    // get last from cache
    const cachedAnnot = getLastCachedAnnot();
    // redraw on canvas
    drawRect(canvas, cachedAnnot.group, cachedAnnot.label, cachedAnnot.class);
    // remove from cache
    deleteCachedAnnotation(idx);
  }
}
