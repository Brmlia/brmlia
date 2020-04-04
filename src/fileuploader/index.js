import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { fileApi } from './fileStore.js'
import { annotApi } from '../annotator/annotStore.js'
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

  addAnnotation(result);
}

export function addAnnotation(annotation) {
  annotApi.setState( prevState => ({
    img_name: fApi.getState().file[idx].name,
    annotations: prevState.annotations.concat(annotation)
  }))
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

