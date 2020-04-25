import React from 'react';
import { fileApi } from '../fileuploader/fileStore.js';
import { annotApi } from '../annotator/annotStore.js'
import { addAnnotationFromJson } from '../annotator/annotationControl.js'

class Annotator extends React.Component {
  file_size = 0;
  annotations = {};

  render() {
    fileApi.subscribe(state => {
      if (state && this.file_size !== state.size) {
        for (var i = 0; i < state.file.length; i++) {
          const json = state.file[i].json
          if (json) {
            addAnnotationFromJson(json)
        this.file_size = state.size;
          }
        }
        console.log('fileApi - files: ', state.file);
      }
    });
    annotApi.subscribe(state => {
        console.log('annot33Api - annotations: ', state.annotations);
      if (this.annotations !== state.annotations) {
        this.annotations = state.annotations;

        console.log('annotApi - annotations: ', state.annotations);
      }
    });
    return <div id="annotator-div"></div>;
  }
}

export default Annotator;
