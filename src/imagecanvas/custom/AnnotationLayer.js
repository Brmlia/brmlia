import React from "react";

import { addAnnotation } from '../annotations/context/annotationControl.js'
import { annotApi } from '../annotations/context/annotationStore.js'

export default class AnnotationLayer extends React.Component {
  constructor(props){
    super(props);
    this.canvas = React.createRef();

    this.state = {
      mousedown: false,
      lastMousex: 0,
      lastMousey: 0,
      mousex: 0,
      mousey: 0,
      canvasx: 0,
      canvasy: 0
    };
  }

  handleMouseDown(e){
    e.persist();
    this.setState({
      mousedown: true,
      lastMousex: parseInt(e.clientX - this.state.canvasx),
      lastMousey: parseInt(e.clientY - this.state.canvasy)
    });
  }

  handleMouseUp(e){
    e.persist();
    if (this.state.mousedown) {
      this.setState( prevState => ({
        mousedown: false,
        mousex: parseInt(e.clientX - this.state.canvasx),
        mousey: parseInt(e.clientY - this.state.canvasy),
      }));

      const x = this.state.lastMousex;
      const y =  this.state.lastMousey;
      const width = this.state.mousex - this.state.lastMousex;
      const height = this.state.mousey - this.state.lastMousey;
      const strokeStyle = 'rgb(70, 70, 150)';
      const lineWidth = 1;
      const ctx = this.canvas.current.getContext("2d");

      addAnnotation(x, y, width, height, strokeStyle, lineWidth, ctx);
      this.renderContext();
    }
  }

  handleMouseMove(e) {
  }

  renderContext() {
    const annotation = annotApi.getState().annotations[annotApi.getState().annotations.length-1];
    const ctx = annotApi.getState().ctx;
    for (let i = 0; i < annotApi.getState().annotations.length; i++) {
      ctx.beginPath();
      ctx.rect(annotation.x, annotation.y, annotation.width, annotation.height);
      ctx.strokeStyle = annotation.stroke;
      ctx.lineWidth = annotation.lineWidth;
      ctx.stroke();
    }
    console.log(annotApi.getState().annotations)
  }

  render () {

    annotApi.subscribe(state =>  {
      this.renderContext();
    })
    return (
      <div id="annotationLayer">
        <canvas ref={this.canvas}
          width="750px"
          height="750px"
          onMouseDown={(e) => this.handleMouseDown(e)}
          onMouseUp={(e) => this.handleMouseUp(e)}

          onMouseMove={(e) => this.handleMouseMove(e)}>
        </canvas>
      </div>
    )
  }
}