import create from 'zustand';

import {
  editAnnotationOption,
  editClassOption,
} from './index.js'

import { deleteAnnotation } from './annotationMenuOptions';

export const initState = {
  menu: {
    displayon: false,
    coords: {
      x: 0,
      y: 0,
    },
    items: [
      {
        label: 'Edit Annotation',
        callback: editAnnotationOption,
      },
      {
        label: 'Edit Class',
        callback: editClassOption,
      },
    ],
    objects: [],
    select: 0,
    canvas: null,
  },
};

export const [useAnnotationMenu, AnnotationMenuApi] = create(set => ({
  ...initState,
}));

export function isDisplayOn() {
  return AnnotationMenuApi.getState().menu.displayon;
}

export function setCanvas(canvas) {
  AnnotationMenuApi.setState(prevState => ({
    ...prevState,
    canvas: canvas,
  }));
}

export function getCanvas() {
  return AnnotationMenuApi.getState().canvas;
}

export function setDisplay(value) {
  AnnotationMenuApi.setState(prevState => ({
    ...prevState,
    menu: {
      ...prevState.menu,
      displayon: value,
    },
  }));
}

export function getMenuCoords() {
  return AnnotationMenuApi.getState().menu.coords;
}

export function setMenuCoords(x, y) {
  AnnotationMenuApi.setState(prevState => ({
    ...prevState,
    menu: {
      ...prevState.menu,
      coords: {
        x: x,
        y: y,
      },
    },
  }));
}

export function getItems() {
  return AnnotationMenuApi.getState().menu.items;
}

export function setSelectedObjects(objects) {
  AnnotationMenuApi.setState(prevState => ({
    ...prevState,
    menu: {
      ...prevState.menu,
      objects: objects,
    },
  }));
}

export function getSelectedObjects() {
  return AnnotationMenuApi.getState().menu.objects;
}

export function updateSelect(sel) {
  AnnotationMenuApi.setState(prevState => ({
    ...prevState,
    menu: {
      ...prevState.menu,
      select: sel,
    },
  }));
}
