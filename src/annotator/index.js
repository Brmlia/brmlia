import React from 'react';
import { fileApi } from '../fileuploader/fileStore.js';
import { annotApi } from '../annotator/annotStore.js'

class Annotator extends React.Component {
  file_size = 0;
  annotations = {};

  render() {
    fileApi.subscribe(state => {
      if (this.file_size !== state.size) {
        this.file_size = state.size;

        console.log('fileApi - files: ', state.file);
      }
    });
    annotApi.subscribe(state => {
      if (this.annotations !== state.annotations) {
        this.annotations = state.annotations;

        console.log('annotApi - annotations: ', state.annotations);
      }
    });
    return <div id="annotator-div"></div>;
  }
}

export default Annotator;
