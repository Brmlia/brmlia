import create from 'zustand';
import React from 'react';
import FabricLayer from '../ui/components/FabricLayer';

import {
  drawRect,
  drawFreeStyle,
  isDisplayOn,
  setDisplay,
  setMenuCoords,
  setSelectedObjects,
  addAnnotation,
  getLastAnnotIdx,
} from './index.js';
import {
  updateAnnotClassLabel,
  createDummyAnnotation,
  updateAnnotationCoords,
  createAnnotation,
  addDummyUndoAnnotation,
} from '../annotator/annotationControl';
import { annotApi, undoApi, redoApi } from '../annotator/annotationStore';

export const modes = {
  RECT: 'rectangle',
  FREE: 'free draw',
  SELECT: 'select',
  NONE: 'none',
};

const initState = {
  layers: [],
  mouse: {
    x: 0,
    y: 0,
    down: false,
  },
  origin: {
    x: 0,
    y: 0,
  },
  drawMode: modes.RECT,
  nextId: 1,
  canvas: null,
};

export const [useFabric, fabricApi] = create(set => ({
  ...initState,
}));

export function initFabricLayers(zIndex, channel) {
  const newFabricLayer = <FabricLayer zIndex={zIndex} channel={channel} />;
  fabricApi.setState(prevState => ({
    ...prevState,
    layers: [...prevState.layers, newFabricLayer],
  }));
}

export function setFabricCanvas(canvas) {
  fabricApi.setState(prevState => ({
    canvas: canvas,
  }));
}

export function setMode(newMode) {
  fabricApi.setState(prevState => ({
    ...prevState,
    drawMode: newMode,
  }));

  if (newMode === modes.FREE) {
    fabricApi.getState().canvas.isDrawingMode = true;
  } else {
    fabricApi.getState().canvas.isDrawingMode = false;
  }
}

export function finishMoving(selection) {
  const objs = selection._objects;
  for (let i = 0; i < objs.length; i++) {
    let subObjs = objs[i]._objects;
    if (subObjs) {
      finishMoving(objs[i]);
    } else {
      updateAnnotationCoords(selection);
      break;
    }
  }
}

export function startSelecting() {
  setMode(modes.SELECT);
}

export function finishSelecting() {
  setMode(modes.RECT);
}

export function startDrawing(x, y) {
  if (fabricApi.getState().canvas.isDrawingMode) {
    startDrawingFree(x, y);
  } else {
    startDrawingRect(x, y);
  }
}

export function startDrawingFree(x, y) {
  drawFreeStyle(fabricApi.getState().canvas);
}

export function finish(x, y) {
  if (fabricApi.getState().drawMode === modes.SELECT) {
    finishSelecting();
  } else if (fabricApi.getState().drawMode === modes.RECT) {
    finishDrawingRect(x, y);
  }
}

export function startDrawingRect(x, y) {
  setOrigin(x, y);
}

export function finishDrawing(x, y) {
  if (fabricApi.getState().drawMode === modes.RECT) {
    finishDrawingRect(x, y);
  }
  setFabricCoords(x, y);
}

export function finishDrawingRect(x, y) {
  setFabricCoords(x, y);
  const state = fabricApi.getState();
  if (state.origin.x && state.origin.y && x && y) {
    const width = state.mouse.x - state.origin.x;
    if (Math.abs(width) >= 10) {
      const rect = {
        width: width,
        height: state.mouse.y - state.origin.y,
        top: state.origin.y,
        left: state.origin.x,
      };
      const label = 'label' + (getLastAnnotIdx() + 1);
      const classLabel = 'class1';
      const fRect = drawRect(
        fabricApi.getState().canvas,
        rect,
        label,
        classLabel
      );

      let nextId = fabricApi.getState().nextId;
      addDummyUndoAnnotation(createDummyAnnotation(nextId));
      addAnnotation(createAnnotation(fRect, label, classLabel, rect, nextId));

      fabricApi.setState(prevState => ({
        ...prevState,
        nextId: nextId + 1,
      }));
    }

    setSelectedObjects(fabricApi.getState().canvas.getActiveObjects()[0]);
  }
}

export function deleteAnnotations(rects) {
  console.log(rects);
}

export function setOrigin(x, y) {
  fabricApi.setState(prevState => ({
    ...prevState,
    origin: {
      x: x - fabricApi.getState().canvas._offset.left,
      y: y - fabricApi.getState().canvas._offset.top,
    },
  }));
}

export function setFabricCoords(x, y) {
  let canvasLeft = fabricApi.getState().canvas._offset.left;
  let canvasRight =
    fabricApi.getState().canvas._offset.left +
    fabricApi.getState().canvas.width;
  let canvasTop = fabricApi.getState().canvas._offset.top;
  let canvasBottom =
    fabricApi.getState().canvas._offset.top +
    fabricApi.getState().canvas.height;
  let relX =
    x < canvasLeft
      ? canvasLeft
      : x > canvasRight
      ? canvasRight
      : x - canvasLeft;
  let relY =
    y < canvasTop ? canvasTop : y > canvasBottom ? canvasBottom : y - canvasTop;

  fabricApi.setState(prevState => ({
    mouse: {
      x: relX,
      y: relY,
    },
  }));
}

export function openMenu(x, y) {
  if (!isDisplayOn()) {
    setDisplay(true);
    let canvas = fabricApi.getState().canvas;
    setMenuCoords(x - canvas._offset.left, y - canvas._offset.top);
  }
}

export function addToFabric() {
  let annots = fabricApi.getState().annotations;

  if (annots.length > fabricApi.getState().canvas.getObjects().length) {
    let lastAnnotIdx = annots.length - 1;
    let annot = annots[lastAnnotIdx];

    var newAnnot = {
      left: parseInt(annot.rect.left),
      top: parseInt(annot.rect.top),
      width: parseInt(annot.rect.width),
      height: parseInt(annot.rect.height),
    };

    drawRect(fabricApi.getState().canvas, newAnnot, annot.label, annot.class);
  }
}
