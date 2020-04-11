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
      reader.onloadend = () => {
        console.debug("importer::importTiff() - Parsing TIFF image...");
        // parseGrayscaleTiff(file);
        parseTiff(reader.result);
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
  var ifds = UTIF.decode(buffer);
  UTIF.decodeImage(buffer, ifds[0]);
  var rgba = UTIF.toRGBA8(ifds[0]);

  // width and height are ok
  // buffer is Not OK
  // ifds[0] is Not OK
  // rgba is Not OK
  // image.toDataURL() returns a black image
  // verified with https://codebeautify.org/base64-to-image-converter

  console.log("importer::parseTiff() - width: ", ifds, ifds[0].width, " height: ",  ifds[0].height, ifds[0])
  console.log("importer::parseTiff() - rgba: ", rgba)

  var image = new Image(ifds[0].width, ifds[0].height)

  // load the image
  // image.src = ifds[0]
  image.src = rgba

  // set src to data url
  image.src = image.toDataURL()

  updateTiff(image)
}