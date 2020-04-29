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
