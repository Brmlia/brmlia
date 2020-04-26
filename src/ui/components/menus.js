import React from 'react';

import { buttonGroup } from '../style.js';
import {
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonGroup,
  Button,
} from 'reactstrap';

import { FileUpload } from '../../fileuploader/fileUploader.js';
import { exportJson } from '../../fileuploader/exporter.js';

import {
  modes,
  setMode,
} from '../../fabric/fabricControl.js'
import {
  undo,
  redo,
} from '../../annotator/annotationEditor.js'

class Menus extends React.Component {
  render() {
    return (
      <ButtonGroup
        size={buttonGroup.size}
        vertical={buttonGroup.vertical}
        style={buttonGroup}
      >
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

        <UncontrolledButtonDropdown>
          <DropdownToggle caret color="primary">
            Draw
          </DropdownToggle>
          <DropdownMenu>
            <Button
              outline
              color="primary"
              className="draw-rectangle-btn"
              onClick={(e) => setMode(modes.RECT)}
            >
              Rectangle
            </Button>
            <Button
              outline
              color="primary"
              className="draw-rectangle-btn"
              onClick={(e) => setMode(modes.FREE)}
            >
              Freehand
            </Button>
          </DropdownMenu>
        </UncontrolledButtonDropdown>

        <UncontrolledButtonDropdown>
          <DropdownToggle caret color="primary">
            Edit
          </DropdownToggle>
          <DropdownMenu>
            <Button
              outline
              color="primary"
              className="draw-rectangle-btn"
              onClick={(e) => undo()}
            >
              Undo
            </Button>
            <Button
              outline
              color="primary"
              className="draw-rectangle-btn"
              onClick={(e) => redo()}
            >
              Redo
            </Button>
          </DropdownMenu>
        </UncontrolledButtonDropdown>

        <Button outline color="primary" className="import-btn">
          {' '}
          <FileUpload name="Import File" />{' '}
        </Button>
      </ButtonGroup>
    );
  }
}

export default Menus;
