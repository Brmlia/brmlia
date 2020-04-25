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
  'rgb(221, 153, 153, 0.7)',
  'rgb(153, 221, 153, 0.7)',
  'rgb(153, 153, 221, 0.7)',
  'rgb(215, 215, 215, 0.7)',
];

export function drawFreeStyle(canvas) {
  window.canvas = canvas;
  canvas.isMouseDown = false;

  canvas.isDrawingMode = true;
  canvas.freeDrawingBrush.color = colors.purple;
  canvas.freeDrawingBrush.opacity = 0.1;
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
    // if fully transparent, only stroke is selectable, hence this hack:
    fill: 'rgb(255,255,255,.01)',
    stroke: colors[0],
    strokeLineJoin: 'round',
    strokeWidth: 2,
    objectCaching: false,
  });

  var group = new fabric.Group([fRect]);

  group.on({
    moving: function(o) {
      const group = o.target;
      const rect = group._objects[0];

      if (group.left < 0) {
        group.set('left', rect.strokeWidth / 2);
        group.setCoords();
      } else if (group.left + group.width > canvas.width) {
        group.set('left', canvas.width - group.width - rect.strokeWidth / 2);
        group.setCoords();
      }

      if (group.top < 0) {
        group.set('top', rect.strokeWidth / 2);
        group.setCoords();
      } else if (group.top + group.height > canvas.height) {
        group.set('top', canvas.height - group.height - rect.strokeWidth / 2);
        group.setCoords();
      }
    },
  });

  var newLabel = label === 'label' ? (label += getLastAnnotIdx() + 1) : label;

  var text = new fabric.IText(newLabel, {
    fontSize: 16,
    originX: 'left',
    originY: 'top',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fill: 'white',
    textBackgroundColor: colors[0],
    top: group.top,
    left: group.left,
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
    top: group.top + group.height,
    left: group.left,
  });

  if (canvas) {
    fRect.perPixelTargetFind = true;
    canvas.add(group);
    canvas.setActiveObject(group);
    group.addWithUpdate(text);
    group.addWithUpdate(classText);
    return fRect;
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
