import React from 'react';

import {
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonGroup,
  Button,
} from 'reactstrap';

import { FileUpload } from '../../fileuploader/fileUploader.js';

import {
  buttonGroupStyle,
  exportJson,
  modes,
  setMode,
  undo,
  redo,
} from './index.js';

class Menus extends React.Component {
  render() {
    return (
      <ButtonGroup
        size={buttonGroupStyle.size}
        vertical={buttonGroupStyle.vertical}
        style={buttonGroupStyle}
      >

        <Button outline color="primary" className="import-btn">
          {' '}
          <FileUpload name="Import File" />{' '}
        </Button>
      </ButtonGroup>
    );
  }
}

export default Menus;
