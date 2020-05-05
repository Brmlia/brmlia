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
  displayFileMenu() {
    return (
      <UncontrolledButtonDropdown>
        <DropdownToggle caret color="primary">
          File
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>
            <Button
              outline
              color="primary"
              className="export-btn"
              onClick={exportJson}
            >
              {' '}
              Export Annotations{' '}
            </Button>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
    );
  }

  displayDrawMenu() {
    return (
      <UncontrolledButtonDropdown>
        <DropdownToggle caret color="primary">
          Draw
        </DropdownToggle>
        <DropdownMenu>
          <Button
            outline
            color="primary"
            className="draw-rectangle-btn"
            onClick={e => setMode(modes.RECT)}
          >
            Rectangle
          </Button>
          <Button
            outline
            color="primary"
            className="draw-rectangle-btn"
            onClick={e => setMode(modes.FREE)}
          >
            Freehand
          </Button>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
    );
  }

  displayEditMenu() {
    return (
      <UncontrolledButtonDropdown>
        <DropdownToggle caret color="primary">
          Edit
        </DropdownToggle>
        <DropdownMenu>
          <Button
            outline
            color="primary"
            className="draw-rectangle-btn"
            onClick={e => undo()}
          >
            Undo
          </Button>
          <Button
            outline
            color="primary"
            className="draw-rectangle-btn"
            onClick={e => redo()}
          >
            Redo
          </Button>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
    );
  }

  displayMiscMenu() {
    return (
      <Button outline color="secondary" className="import-btn">
        {' '}
        <FileUpload name="Import File" />{' '}
      </Button>
    );
  }

  render() {
    return (
      <ButtonGroup
        size={buttonGroupStyle.size}
        vertical={buttonGroupStyle.vertical}
        style={buttonGroupStyle}
      >
        {this.displayFileMenu()}
        {this.displayDrawMenu()}
        {this.displayEditMenu()}
        {this.displayMiscMenu()}
      </ButtonGroup>
    );
  }
}

export default Menus;
