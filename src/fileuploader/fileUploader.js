import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  initPng,
  addPng,
  initTiff,
  addTiff,
  initCsv,
  addCsv,
  initJson,
  addJson,
  isFirstFile,
  isValidFile,
  saveTotalNumOfFiles,
} from './index.js';

function addFile(file) {
  if (file.type === 'image/png') {
    addPng(file);
  } else if (file.type === 'image/tiff') {
    addTiff(file);
  } else if (file.type === 'text/csv') {
    addCsv(file);
  } else if (file.type === 'application/json') {
    addJson(file);
  }
}

function initFile(file) {
  if (file.type === 'image/png') {
    initPng(file);
  } else if (file.type === 'image/tiff') {
    initTiff(file);
  } else if (file.type === 'text/csv') {
    initCsv(file);
  } else if (file.type === 'application/json') {
    initJson(file);
  }
}

export function FileUpload(props) {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/png, image/tiff, .csv, .json',
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const update = files.map(file => {
    if (isValidFile(file.name)) {
      if (isFirstFile()) {
        initFile(file);
      } else {
        addFile(file);
      }
    }
    return null;
  });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p> {props.name} </p>
        {saveTotalNumOfFiles(files.length)}
        {update}
      </div>
    </section>
  );
}
