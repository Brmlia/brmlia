import React from "react";

import { thumb, thumbInner } from '../../style.js';
import { fApi } from '../../utils/index.js'
import { Stage, Layer, Shape } from "react-konva";

class Thumbnails extends React.Component {

  selected = 0;
  length = 0;

  setSelected(idx) {
    if (this.selected !== idx) {
      fApi.setState( prevState => ({
        ...prevState,
        selected: idx
      }))
      this.selected = idx;
    }
  }

  state = {
    files: []
  }

  updateForFile(state) {
    if (state && (state.file.length > 0) && (state.file.length !== this.length)) {
      const idx = state.file.length - 1
      const file = state.file[idx]
      const newFile = {
        rgba: file.rgba,
        width: file.image.width,
        height: file.image.height,
        page: file.pages[0],
        name: file.name
      }

      this.setState( prevState => ({
        ...prevState,
        files: [
          ...prevState.files,
          newFile
        ]
      }))
      this.length = state.file.length
      this.forceUpdate();
    }
  }

  classicImage = (file, idx) => {
    return(
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img
            src={file.image}
            style={file.style}
            alt={file.name}
            onClick={() => this.setSelected(idx)}
          />
        </div>
      </div>
    )
  }

  allThumbs = () => {
    var elements = [];

    if (fApi.getState().file) {
      fApi.getState().file.map ((file, idx) => {
        if (file.type === "image/png"
        ){
          elements.push (
            this.classicImage(file, idx)
          )
        }
        return null;
      });
    }

    return (
      <div>
        {elements}
      </div>
    );
  }

  // todo: shrink image size
  loadTiff(context) {
    for (var f = 0; f < this.state.files.length; f++) {

      const file = this.state.files[f]
      var page = null
      if (file ) {
        page = file.page
      }
      if (page && (file.width > 0) && (file.height > 0)) {
        const imageData = context.createImageData(
          file.width,
          file.height
        );

        for (let idx = 0; idx < page.length; idx++) {
          imageData.data[idx] = page[idx];
        }
        context.putImageData(imageData, (file.width+50)*f, 0);
      }
    }
  }

  allTiffs = () => {
    return (
      <div>
        <Stage width={window.innerWidth} height={window.innerWidth}>
          <Layer>
            <Shape
              x={0}
              y={0}
              sceneFunc={context => {
                this.loadTiff(context);
              }}
            />
          </Layer>
        </Stage>
      </div>
    );
  }

  display() {
    // return (
    //   this.allThumbs()
    //   this.allTiffs()
    // )
    return (
      <div>
        {this.allThumbs()}
        {this.allTiffs()}
      </div>
    )
  }

  render() {

    fApi.subscribe(state =>  {
      this.updateForFile(state)
      this.forceUpdate()
    })

    return (
      <div id="thumbsContainer">
        {this.display()}
      </div>
    );
  }
}

export default Thumbnails;
