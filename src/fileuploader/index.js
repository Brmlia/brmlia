import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { fApi, fStore } from '../utils/index.js'

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 50,
  height: 50,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

function addFile(file, img) {
  // method 1
  fApi.setState( prevState => ({
    file: [...prevState.file, {
      name: file.name,
      image: file.preview,
      style: img,
      type: file.type
    }],
    size: prevState.size + 1
  }))
}

function isValidFile(name) {
  // check if file is already uploaded
  var validFile = false;

  fApi.setState( prevState => {
    const x = prevState.file.filter(file => file.name === name)
    if (x.length === 0) {
      validFile = true;
    }
  })
  return validFile
}

function setSelected(idx) {
  fApi.setState( prevState => ({
    ...prevState,
    selected: idx
  }))
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

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          type={file.type}
        />
      </div>
    </div>
  ));

  const allThumbs = fApi.getState().file.map ((file, idx) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.image}
          style={file.style}
          onClick={() => setSelected(idx)}
        />
      </div>
    </div>
  ));

  const update = files.map(file => {
    if (isValidFile(file.name)) {
      addFile(file, img)
      console.log("fileUploader::update() - updated state: " , fApi.getState())
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
      <aside style={thumbsContainer}>
        {allThumbs}
      </aside>
    </section>
  );
}

