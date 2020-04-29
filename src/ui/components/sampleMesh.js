import React from 'react';
import TestCanvas from './testCanvas.js';

class SampleMesh extends React.Component {
  render() {
    return (
      <div>
        <TestCanvas
          height="100px"
          channel="1"
        >
        </TestCanvas>
      </div>
    )
  }
}

export default SampleMesh