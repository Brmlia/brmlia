import React from "react";
import create from 'zustand';
import Mesh from './Mesh.js'

export const initState = {
  canvas:
    [
      <Mesh channel='1' position={[0, 0, 0]} />,
      <Mesh channel='2' position={[0, 0, 1]} />,
      <Mesh channel='3' position={[0, 0, 2]} />
    ],
}

export const [useCanvasStore, canvasApi] = create ( set => ({
  ...initState,
}))