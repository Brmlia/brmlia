import csv from "csvtojson";
import { saveJson, updateTiff } from "../fileuploader/fileControl.js"
import { Image } from "image-js"
import UTIF  from "utif"

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

export function importTiff(file) {
  const reader = new FileReader();

  if (file) {
      reader.onload = () => {
        var success = (file.type === "image/tiff");
        if (success) {
          console.debug("importer::importTiff() - Loading TIFF image...");
        }

      }
      reader.onloadend = (event) => {
        console.debug("importer::importTiff() - Parsing TIFF image...");
        // parseGrayscaleTiff(file);
        parseTiff(event.target.result);
      }
      reader.onprogress = () => {
        console.log("importer::importTiff()", "Still Loading...")
      }
      reader.readAsArrayBuffer(file);
  }
}

export function parseGrayscaleTiff(file) {
  var image = file.preview
  Image.load(image).then(function (image) {
    image.src = image.toDataURL()
    updateTiff(image)
  }).catch( function (e) {
    console.error("ERROR Unsupported compression: ", e)
  })
}

export function parseTiff(buffer) {
  const ifds = UTIF.decode(buffer);
  UTIF.decodeImages(buffer, ifds);
  var rgba = UTIF.toRGBA8(ifds[0]);

  var image = new Image(ifds[0].width, ifds[0].height)
  updateTiff(image, rgba)
}