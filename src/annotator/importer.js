import csv from "csvtojson";
import { saveJson } from "../fileuploader/index.js"

export function importCsv(file) {

  const reader = new FileReader();

  reader.onload = () => {
    const fileAsBinaryString = reader.result;

    csv({
      noheader: true,
      output: "json"
    })
      .fromString(fileAsBinaryString)
      .then(csvRows => {
        const toJson = [];
        csvRows.forEach((aCsvRow, i) => {
          if (i !== 0) {
            const builtObject = {};

            Object.keys(aCsvRow).forEach(aKey => {
              const valueToAddInBuiltObject = aCsvRow[aKey];
              const keyToAddInBuiltObject = csvRows[0][aKey];
              builtObject[keyToAddInBuiltObject] = valueToAddInBuiltObject;
            });

            toJson.push(builtObject);
          }
        });
        saveJson(toJson);
      });
  };

  reader.onabort = () => console.log("file reading was aborted");
  reader.onerror = () => console.log("file reading has failed");

  reader.readAsText(file, 'ISO-8859-1');
}

export function importJson(file) {
  const reader = new FileReader();
  let json;
  reader.onload = () => {
    json = JSON.parse(reader.result);
    saveJson(json.annotations);
  }
  reader.readAsText(file);
}