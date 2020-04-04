import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { fApi, fStore } from '../utils/index.js'

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

function addFile(file, img) {
  // method 1
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

function initFile(file, img) {
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

function isFirstFile() {
  return (!fApi.getState().file)
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

export function ImageUpload(props) {
  const [files, setFiles] = useState([]);

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/png, image/tiff',
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
      initFile(file, img)
    }
    else if (isValidFile(file.name)) {
      addFile(file, img)
    }
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

