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
  buttonGroup,
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
        size={buttonGroup.size}
        vertical={buttonGroup.vertical}
        style={buttonGroup}
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
