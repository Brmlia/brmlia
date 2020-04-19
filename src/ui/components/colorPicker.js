import React from 'react';
import { SketchPicker } from 'react-color';

class ColorPicker extends React.Component {
  state = {
    background: '#fff', //initial color
  };

  handleChangeComplete = color => {
    this.setState({ background: color.hex });
  };

  render() {
    return (
      <SketchPicker
        color={this.state.background}
        onChangeComplete={this.handleChangeComplete}
      />
    );
  }
}
export default ColorPicker;
