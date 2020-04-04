import {annotApi} from './annotStore.js'

export function exportJson() {
  const element = document.createElement("a");

  const file = new Blob([JSON.stringify(annotApi.getState())], {type: 'text/plain'});
  element.href = URL.createObjectURL(file);
  element.download = "annotations.txt";
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
}