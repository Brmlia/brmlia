import create from 'zustand';
import {editAnnotationOption, editClassOption} from './FabricMenuOptions.js'

export const initState = {
  menu: {
    displayon: false,
    coords: {
      x: 0,
      y: 0
    },
    items: [
      {
        "label": "Edit Annotation",
        "callback": editAnnotationOption
      },
      {
        "label": "Edit Class",
        "callback": editClassOption
      }
    ],
    objects: [],
    select: 0,
    canvas: null
  }
}

export const [useFabricMenu, FabricMenuApi] = create ( set => ({
  ...initState,
}))

export function isDisplayOn() {
  return FabricMenuApi.getState().menu.displayon
}

export function setCanvas(canvas) {
  FabricMenuApi.setState( prevState => ({
    ...prevState,
    canvas: canvas
  }))
}

export function getCanvas() {
  return FabricMenuApi.getState().canvas
}

export function setDisplay(value) {
  FabricMenuApi.setState( prevState => ({
    ...prevState,
    menu: {
      ...prevState.menu,
      displayon: value
    }
  }))
}

export function getCoords() {
  return FabricMenuApi.getState().menu.coords
}

export function setCoords(x, y) {
  FabricMenuApi.setState( prevState => ({
    ...prevState,
    menu: {
      ...prevState.menu,
      coords: {
        x: x,
        y: y
      }
    }
  }))
}

export function getItems() {
  return FabricMenuApi.getState().menu.items
}

export function setSelectedObjects(objects) {
  FabricMenuApi.setState( prevState => ({
    ...prevState,
    menu: {
      ...prevState.menu,
      objects: objects
    }
  }))
}

export function getSelectedObjects() {
  return FabricMenuApi.getState().menu.objects
}

export function updateSelect(sel) {
  FabricMenuApi.setState( prevState => ({
    ...prevState,
    menu: {
      ...prevState.menu,
      select: sel
    }
  }))
}
