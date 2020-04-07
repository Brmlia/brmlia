import {setDisplay, getSelectedObjects, updateSelect} from "./FabricMenuSettings.js"
import {updateLabel, updateClassLabel} from '../annotations/fabric/editControl.js'

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
  updateLabel(obj, label)
  updateSelect(0);
}

export function editAnnotationClass(className) {

  const obj = getSelectedObjects()
  updateClassLabel(obj, className)
  updateSelect(0);
}
