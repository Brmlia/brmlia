import React from 'react';
import create from 'zustand';
import Mesh from './Mesh.js';
import { Canvas } from 'react-three-fiber';

export const meshState = {
  mesh: [<Mesh channel="1" />, <Mesh channel="2" />, <Mesh channel="3" />, <Mesh channel="4" />, <Mesh channel="5" />, <Mesh channel="6" />, <Mesh channel="7" />, <Mesh channel="8" />, <Mesh channel="9" />, <Mesh channel="10" />, <Mesh channel="11" />],
};

export const [useMeshStore, meshApi] = create(set => ({
  ...meshState,
}));

export const canvasState = {
  canvas: [
    <Canvas className={'image-canvas-1'}>{meshState.mesh[0]}</Canvas>,
    <Canvas className={'image-canvas-2'}>{meshState.mesh[1]}</Canvas>,
    <Canvas className={'image-canvas-3'}>{meshState.mesh[2]}</Canvas>,
    <Canvas className={'image-canvas-4'}>{meshState.mesh[3]}</Canvas>,
    <Canvas className={'image-canvas-5'}>{meshState.mesh[4]}</Canvas>,
    <Canvas className={'image-canvas-6'}>{meshState.mesh[5]}</Canvas>,
    <Canvas className={'image-canvas-7'}>{meshState.mesh[6]}</Canvas>,
    <Canvas className={'image-canvas-8'}>{meshState.mesh[7]}</Canvas>,
    <Canvas className={'image-canvas-9'}>{meshState.mesh[8]}</Canvas>,
    <Canvas className={'image-canvas-10'}>{meshState.mesh[9]}</Canvas>,
    <Canvas className={'main-image-canvas'}>{meshState.mesh[10]}</Canvas>,
  ],
};

export const [useCanvasStore, canvasApi] = create(set => ({
  ...canvasState,
}));
