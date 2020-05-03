import {
  setDisplay,
  getSelectedObjects,
  updateSelect,
  updateLabel,
  updateClassLabel,
} from './index.js';

// import { deleteAnnotations } from '../fabric/fabricControl.js';

export function editAnnotationOption() {
  setDisplay(false);
  updateSelect(1);
}
export function editClassOption() {
  setDisplay(false);
  updateSelect(2);
}

export function editAnnotationLabel(label) {
  const obj = getSelectedObjects();
  if (obj && obj._objects.length > 0) {
    updateLabel(obj, label);
    updateSelect(0);
  }
}

export function editAnnotationClass(className) {
  const obj = getSelectedObjects();
  if (obj && obj._objects.length > 0) {
    updateClassLabel(obj, className);
    updateSelect(0);
  }
}

export function deleteSelectedAnnotations() {
  const obj = getSelectedObjects();
  if (obj && obj._objects.length > 0) {
    // deleteAnnotations('hi');
  }
}
