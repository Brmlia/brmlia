import React from 'react';
import Canvas2 from './Canvas2.js';
// import Mesh from './../../imagecanvas/Mesh.js';
import Mesh from './Mesh2.js';

class SampleMesh extends React.Component {
  render() {
    return (
      <Canvas2
        height="100px"
        channel="1"
      >
      </Canvas2>
    )
  }
}

export default SampleMesh