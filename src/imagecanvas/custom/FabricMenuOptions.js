import {setDisplay, getSelectedObjects, updateSelect} from "./FabricMenuSettings.js"
import {updateAnnonationClassLabel} from "../annotations/fabric/annotationControl.js"
import {updateLabel} from '../annotations/fabric/editControl.js'

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
}

export function updateAnnotationClass(className) {

  const obj = getSelectedObjects()
  if (obj.length > 0) {
    updateAnnonationClassLabel(obj[1].text, className)
  }
}
