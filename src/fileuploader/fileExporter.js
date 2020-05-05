import {
  annotApi,
} from './index.js';

export function exportJson() {
  const element = document.createElement('a');

  const json = convertToExportableJson()

  const file = new Blob([json], {
    type: 'text/plain',
  });
  element.href = URL.createObjectURL(file);
  element.download = 'annotations.json';
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
}

function convertToExportableJson() {
  const annots = annotApi.getState().annotations
  var newAnnots = {"annotations": [] }

  for (var i = 0; i < annots.length; i++) {
    const annot = annots[i]
    const newAnnot = {
      "class": annot.class,
      "id": annot.id,
      "label": annot.label,
      "rect": annot.rect,
    }
    newAnnots.annotations[i] = newAnnot
  }

  return JSON.stringify(newAnnots, null, 2)
}

export function exportFile(filename, json) {
  const element = document.createElement('a');

  const file = new Blob([JSON.stringify(json, null, 2)], {
    type: 'text/plain',
  });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
}
