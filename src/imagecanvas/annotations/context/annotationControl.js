import React from "react";
import { annotApi } from './annotationStore.js'

export function addAnnotation(x, y, width, height, stroke, lineWidth, ctx) {
  annotApi.setState( prevState => ({
    ...prevState,
    annotations: [...prevState.annotations, {
      x: x,
      y: y,
      width: width,
      height: height,
      strokeStyle: stroke,
      lineWidth: lineWidth
    }],
    ctx: ctx
  }))
}

export function deleteAnnotation(index) {
  const annotation = annotApi.getState().annotations[index];
  annotApi.setState( prevState => {
    return prevState.annotations.splice(index, 1)
  })

  if (annotation) {
    annotApi.getState().ctx.clearRect(annotation.x-10, annotation.y-10, annotation.width+20, annotation.height+20);
  }
}

export function undoAnnotation() {
  deleteAnnotation(annotApi.getState().annotations.length-1);
}