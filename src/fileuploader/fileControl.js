
import { fileApi } from './fileStore.js'
import { annotApi } from '../annotator/annotStore.js'
import { addAnnotation } from '../annotator/annotationControl.js'
import { createTexture, createTextureFromTiff } from '../imagecanvas/ImageStore.js'
import { importCsv, importJson, importTiff } from '../annotator/importer.js'

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

var idx = 0;

export function isFirstFile() {
  return (fileApi.getState().size === 0)
}

export function isValidFile(name) {
  // check if file is already uploaded
  var validFile = false;

  fileApi.setState( prevState => {
    if (prevState.file) {

      const x = prevState.file.filter(file => file.name === name)
      if (x.length === 0) {
        validFile = true;
      }
    }
  })
  return validFile
}

export function initPng(file) {
  fileApi.setState( prevState => ({
    ...prevState,
    file: [{
      name: file.name,
      image: file.preview,
      style: img,
      type: file.type,
      texture: createTexture(file.preview)
    }],
    size: prevState.size + 1
  }))
  idx = fileApi.getState().size-1
}

export function addPng(file) {
  fileApi.setState( prevState => ({
    ...prevState,
    file: [...prevState.file, {
      name: file.name,
      image: file.preview,
      style: img,
      type: file.type,
      texture: createTexture(file.preview)
    }],
    size: prevState.size + 1
  }))
  idx = fileApi.getState().size-1
}

export function initTiff(file) {
  fileApi.setState( prevState => ({
    ...prevState,
    file: [...prevState.file, {
      name: file.name,
      image: file.preview,
      style: img,
      type: file.type
    }],
    size: prevState.size + 1
  }))
  importTiff(file);
  idx = fileApi.getState().size-1
}

export function addTiff(file) {
  fileApi.setState( prevState => ({
    ...prevState,
    file: [...prevState.file, {
      name: file.name,
      image: file.preview,
      style: img,
      type: file.type
    }],
    size: prevState.size + 1
  }))
  importTiff(file);
  idx = fileApi.getState().size-1
}

// export function updateTiff(image) {
//   fileApi.setState( prevState => {
//     const file = prevState.file.map((file, j) => {
//       var newFile = file;
//       newFile.texture = createTextureFromTiff(image.src)
//       newFile.image = image
//       return newFile;
//     })
//     return {
//       file
//     }
//   })

// }

export function updateTiff(image, rgba) {
  fileApi.setState( prevState => {
    const file = prevState.file.map((file, j) => {
      var newFile = file;
      newFile.texture = createTextureFromTiff(image.src)
      newFile.image = image
      newFile.rgba = rgba
      return newFile;
    })
    return {
      file
    }
  })

}

export function updateTiffPages(name, pages, image) {
  fileApi.setState( prevState => {
    const file = prevState.file.map((file, j) => {
      if (file.name === name) {
        var newFile = file;
        newFile.pages = pages
        newFile.image = image
        return newFile;
      }
      else {
        return file
      }
    })
    return {
      file
    }
  })

}

export function initCsv(file) {
  fileApi.setState( prevState => ({
    ...prevState,
    file: [{
      name: file.name,
      type: file.type,
      json: importCsv(file)
    }],
    size: prevState.size + 1
  }))
  idx = fileApi.getState().size-1
}

export function addCsv(file) {
  fileApi.setState( prevState => ({
    ...prevState,
    file: [...prevState.file, {
      name: file.name,
      type: file.type,
      json: importCsv(file)
    }],
    size: prevState.size + 1
  }))
  idx = fileApi.getState().size-1
}

export function initJson(file) {
  fileApi.setState( prevState => ({
    ...prevState,
    file: [{
      name: file.name,
      type: file.type,
      json: importJson(file)
    }],
    size: prevState.size + 1
  }))
  idx = fileApi.getState().size-1
}

export function addJson(file) {
  fileApi.setState( prevState => ({
    ...prevState,
    file: [...prevState.file, {
      name: file.name,
      type: file.type,
      json: importJson(file)
    }],
    size: prevState.size + 1
  }))
  idx = fileApi.getState().size-1
}

function isAnnotValid(annotation) {
  return (annotation
    && (annotation.rect.left > 0) && (annotation.rect.left < 1000)
    && (annotation.rect.top > 0) && (annotation.rect.top < 1000)
    && (annotation.rect.width > 0) && (annotation.rect.width < 1000)
    && (annotation.rect.height > 0) && (annotation.rect.height < 1000)
    && (annotation.label.length > 0)
  )
}

function addJsonAnnot(annotation) {
  annotApi.setState( prevState => ({
    img_name: fileApi.getState().file[idx].name,
    annotations: prevState.annotations.concat(annotation)
  }))
  for (var i = 0;  i < annotation.length; i++) {
    if (isAnnotValid(annotation[i])) {
      addAnnotation(annotation[i].rect, annotation[i].label)
    }
  }
}

export function saveJson(result) {
  fileApi.setState( prevState => {
    const file = prevState.file.map (( f, i) => {
      if (i === idx) {
        var newFile = f;
        f.json = result;
        return newFile;
      }
      else {
        return f;
      }
    })
    return file;
  })

  addJsonAnnot(result);
}
