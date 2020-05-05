import React from 'react';

import {
  Button,
  Navbar,
} from 'reactstrap';

import { FileUpload } from '../../fileuploader/fileUploader.js';

import {
  exportJson,
  modes,
  setMode,
  undo,
  redo,
} from './index.js';

class Menus extends React.Component {

  displayFileMenu() {
    return (
      <div>
        <Button color="primary" className="import-btn">
          {' '}
          <FileUpload name="Import File" />{' '}
        </Button> &nbsp;

        <Button
          color="primary"
          className="export-btn"
          onClick={exportJson}
        >
          {' '}
          Export Annotations{' '}
        </Button> &nbsp;
      </div>
    )
  }

  displayDrawMenu() {
    return (
      <div>
          <Button
            color="primary"
            className="draw-rectangle-btn"
            onClick={e => setMode(modes.RECT)}
          >
            Draw Rectangle
          </Button> &nbsp;
          <Button
            color="primary"
            className="draw-rectangle-btn"
            onClick={e => setMode(modes.FREE)}
          >
            Draw Freehand
          </Button> &nbsp;
      </div>
    )
  }

  displayEditMenu() {
    return (
      <div>
          <Button
            color="primary"
            className="draw-rectangle-btn"
            onClick={e => undo()}
          >
            Undo
          </Button> &nbsp;
          <Button
            color="primary"
            className="draw-rectangle-btn"
            onClick={e => redo()}
          >
            Redo
          </Button> &nbsp;
      </div>
    )
  }

  render() {
    return (
      <div style={{padding: "15px"}}>
        <Navbar color="light" light className="navbar shadow-sm p-3 mb-0 bg-white rounded" expand="md">
          {this.displayFileMenu()}
          {this.displayDrawMenu()}
          {this.displayEditMenu()}
        </Navbar>
      </div>
    );
  }
}

export default Menus;
