import React from 'react';

import {
  Button,
  Navbar,
} from 'reactstrap';

import { FileUpload } from '../../fileuploader/fileUploader.js';

import {
  exportJson,
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

  render() {
    return (
      <div style={{padding: "15px"}}>
        <Navbar color="light" light className="navbar shadow-sm p-3 mb-0 bg-white rounded" expand="md">
          {this.displayFileMenu()}
        </Navbar>
      </div>
    );
  }
}

export default Menus;
