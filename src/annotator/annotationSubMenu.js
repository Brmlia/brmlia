import React from "react";
import {editAnnotationLabel, editAnnotationClass} from './annotationMenuOptions.js'

class AnnotationSubMenu extends React.Component {
 constructor(props) {
   super(props);
    this.handleChange = this.handleChange.bind(this);
    this.changeLabel = this.changeLabel.bind(this);
    this.changeClassLabel = this.changeClassLabel.bind(this);

    this.state = {
      text: {
        style: {
         'position': 'absolute',
         'top': '0px',
         'left':'0px'
        },
      },
      label: {
        text: "",
        style: {
         'position': 'absolute',
         'top': '0px',
         'left':'0px'
        },
      },
      button: {
        style: {
         'position': 'absolute',
         'top': '0px',
         'left':'0px'
        },
      },
    };
  }

  componentDidMount() {
    var labelTop = (parseInt(this.props.style.top.match(/\d+/g)) - 40) +'px'
    var buttonLeft = (parseInt(this.props.style.left.match(/\d+/g)) + 105) +'px'

    this.setState({
      text: {
        style: {
           'position': this.props.style.position,
           'top': this.props.style.top,
           'left': this.props.style.left,
           'width': '100px'
        }
      },
      label: {
        style: {
           'position': this.props.style.position,
           'top': labelTop,
           'left': this.props.style.left,
           'width': '100px'
        },
        text: ''
      },
      button: {
        style: {
           'position': this.props.style.position,
           'top': this.props.style.top,
           'left': buttonLeft
        }
      }
    })
  }

  handleChange(event) {
    if (event && event.target && event.target.value) {
      var newStr = event.target.value
      this.setState( prevState => ({
        ...prevState,
        label: {
          ...prevState.label,
          text: newStr
        }
      }))
    }
  }

  changeLabel(event) {
    editAnnotationLabel(this.state.label.text)
  }

  changeClassLabel(event) {
    editAnnotationClass(this.state.label.text)
  }

  display() {
    if (this.props.select === 1) {
      return (
        <div >
          <div style={this.state.label.style}> <p> Label: </p> </div>
          <input
            type="text"
            value={this.state.label.text}
            style={this.state.text.style}
            onChange={this.handleChange}
          />
          <button style={this.state.button.style} onClick={this.changeLabel}> Change Label </button>
        </div>
      );
    }
    else if (this.props.select === 2) {
      return (
        <div >
          <div style={this.state.label.style}> <p> Class Name: </p> </div>
          <input
            type="text"
            value={this.state.label.text}
            style={this.state.text.style}
            onChange={this.handleChange}
          />
          <button style={this.state.button.style} onClick={this.changeClassLabel}> Change Class Name </button>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.display()}
      </div>
    )
  }
}

export default AnnotationSubMenu;