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
  element.download = 'annotations.txt';
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
}

function convertToExportableJson() {
  const annots = annotApi.getState().annotations
  var newAnnots = []

  for (var i = 0; i < annots.length; i++) {
    const annot = annots[i]
    const newAnnot = {
      "class": annot.class,
      "id": annot.id,
      "label": annot.label,
      "rect": annot.rect,
    }
    newAnnots[i] = newAnnot
  }

  return JSON.stringify(newAnnots)
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
