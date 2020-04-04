import React from "react";
import create from 'zustand';
import Mesh from './Mesh.js'
import { Canvas } from 'react-three-fiber';
import { canvasStyle1, canvasStyle2, canvasStyle3 } from '../ui/style.js'

export const meshState = {
  mesh:
    [
      <Mesh channel='1'/>,
      <Mesh channel='2'/>,
      <Mesh channel='3'/>
    ]
}

export const [useMeshStore, meshApi] = create ( set => ({
  ...meshState,
}))

export const canvasState = {
  canvas:
    [
      <Canvas className={'image-canvas-1'}>
        {meshState.mesh[0]}
      </Canvas>,
      <Canvas className={'image-canvas-2'}>
        {meshState.mesh[1]}
      </Canvas>,
      <Canvas className={'image-canvas-3'}>
        {meshState.mesh[2]}
      </Canvas>
    ]
}

export const [useCanvasStore, canvasApi] = create ( set => ({
  ...canvasState,
}))