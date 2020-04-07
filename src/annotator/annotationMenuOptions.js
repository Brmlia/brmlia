import {setDisplay, getSelectedObjects, updateSelect} from "./annotationSettings.js"
import {updateLabel, updateClassLabel} from './editControl.js'

export function editAnnotationOption(label, classLabel) {
  setDisplay(false);
  updateSelect(1);
}
export function editClassOption() {
  setDisplay(false);
  updateSelect(2);
}

export function editAnnotationLabel(label) {

  const obj = getSelectedObjects()
  if (obj && (obj._objects.length > 0)) {
    updateLabel(obj, label)
    updateSelect(0);
  }
}

export function editAnnotationClass(className) {
  const obj = getSelectedObjects()
  if (obj && (obj._objects.length > 0)) {
    updateClassLabel(obj, className)
    updateSelect(0);
  }
}
