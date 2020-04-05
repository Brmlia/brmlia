import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { fileApi } from './fileStore.js'
import { annotApi } from '../annotator/annotStore.js'
import { addAnnotation } from '../annotations/fabric/annotationControl.js'
import { importCsv, importJson } from '../annotator/importer.js'

const fApi = fileApi;

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

var idx = 0;

export function saveJson(result) {
  fApi.setState( prevState => {
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

function isAnnotValid(annotation) {
  return (annotation
    && (annotation.rect.left > 0) && (annotation.rect.left < 1000)
    && (annotation.rect.top > 0) && (annotation.rect.top < 1000)
    && (annotation.rect.width > 0) && (annotation.rect.width < 1000)
    && (annotation.rect.height > 0) && (annotation.rect.height < 1000)
    && (annotation.label.length > 0)
  )
}

export function addJsonAnnot(annotation) {
  annotApi.setState( prevState => ({
    img_name: fApi.getState().file[idx].name,
    annotations: prevState.annotations.concat(annotation)
  }))
  for (var i = 0;  i < annotation.length; i++) {
    if (isAnnotValid(annotation[i])) {
      addAnnotation(annotation[i].rect, annotation[i].label)
    }
  }
}

function addFile(file) {
  if ((file.type === "image/png") || (file.type === "image/tiff")) {
    fApi.setState( prevState => ({
      ...prevState,
      file: [...prevState.file, {
        name: file.name,
        image: file.preview,
        style: img,
        type: file.type
      }],
      size: prevState.size + 1
    }))
  }
  else if (file.type === "text/csv") {
    fApi.setState( prevState => ({
      ...prevState,
      file: [...prevState.file, {
        name: file.name,
        type: file.type,
        json: importCsv(file)
      }],
      size: prevState.size + 1
    }))
  }
  else if (file.type === "application/json") {
    fApi.setState( prevState => ({
      ...prevState,
      file: [...prevState.file, {
        name: file.name,
        type: file.type,
        json: importJson(file)
      }],
      size: prevState.size + 1
    }))
  }
  idx = fApi.getState().size-1
}

function initFile(file) {
  if ((file.type === "image/png") || (file.type === "image/tiff")) {
    fApi.setState( prevState => ({
      ...prevState,
      file: [{
        name: file.name,
        image: file.preview,
        style: img,
        type: file.type
      }],
      size: prevState.size + 1
    }))
  }
  else if (file.type === "text/csv") {
    fApi.setState( prevState => ({
      ...prevState,
      file: [{
        name: file.name,
        type: file.type,
        json: importCsv(file)
      }],
      size: prevState.size + 1
    }))
  }
  else if (file.type === "application/json") {
    fApi.setState( prevState => ({
      ...prevState,
      file: [{
        name: file.name,
        type: file.type,
        json: importJson(file)
      }],
      size: prevState.size + 1
    }))
  }
  idx = fApi.getState().size-1
}

function isFirstFile() {
  return (fApi.getState().size === 0)
}

function isValidFile(name) {
  // check if file is already uploaded
  var validFile = false;

  fApi.setState( prevState => {
    if (prevState.file) {

      const x = prevState.file.filter(file => file.name === name)
      if (x.length === 0) {
        validFile = true;
      }
    }
  })
  return validFile
}


export function FileUpload(props) {
  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/png, image/tiff, .csv, .json',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      ));
    }
  });

  const update = files.map(file => {
    if (isFirstFile()) {
      initFile(file)
    }
    else if (isValidFile(file.name)) {
      addFile(file)
    }
    return null
  });

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p> {props.name} </p>
       { update }
      </div>
    </section>
  );
}

