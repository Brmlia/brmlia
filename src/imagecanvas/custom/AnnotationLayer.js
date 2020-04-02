import React from "react";


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
    this.setState({
      mousedown: true,
      lastMousex: parseInt(e.clientX - this.state.canvasx),
      lastMousey: parseInt(e.clientY - this.state.canvasy)
    });
  }

  handleMouseUp(e){
    this.setState({mousedown: false});
  }

  handleMouseMove(e) {
    this.setState({
      mousex: parseInt(e.clientX - this.state.canvasx),
      mousey: parseInt(e.clientY - this.state.canvasy)
    });


      if (this.state.mousedown) {
        const ctx = this.canvas.current.getContext("2d");
        ctx.clearRect(0, 0, this.canvas.current.width, this.canvas.current.height); //clear canvas
        ctx.beginPath();
        var width = this.state.mousex - this.state.lastMousex;
        var height = this.state.mousey - this.state.lastMousey;
        ctx.rect(this.state.lastMousex,this.state.lastMousey,width,height);
        ctx.strokeStyle = 'rgb(70, 70, 150)';
        ctx.lineWidth = 1;
        ctx.stroke();
    }
  }
 
  render () {
    
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