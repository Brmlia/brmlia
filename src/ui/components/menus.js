import React from 'react';

import { Button, Navbar, Modal, ModalBody } from 'reactstrap';

import { FileUpload } from '../../fileuploader/fileUploader.js';

import { exportJson, modes, setMode, undo, redo, delAnnot, updateLabel, updateClassLabel } from './index.js';

class Menus extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      labelModalOpen: false,
      classModalOpen: false,
      labelText: '',
      classText: '',
    }
  }

  displayFileMenu() {
    return (
      <div>
        <Button color="primary" className="import-btn">
          {' '}
          <FileUpload name="Import File" />{' '}
        </Button>{' '}
        &nbsp;
        <Button color="primary" className="export-btn" onClick={exportJson}>
          {' '}
          Export Annotations{' '}
        </Button>{' '}
        &nbsp;
      </div>
    );
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
        </Button>{' '}
        &nbsp;
        {/* <Button
          color="primary"
          className="draw-rectangle-btn"
          onClick={e => setMode(modes.FREE)}
        >
          Draw Freehand
        </Button>{' '}
        &nbsp; */}
      </div>
    );
  }

  toggleLabel() {
    this.setState(prevState => ({
      ...prevState,
      labelModalOpen: !prevState.labelModalOpen
    }))
  }

  handleChangeLabel(event) {
    if (event && event.target && event.target.value) {
      var newStr = event.target.value;
      this.setState(prevState => ({
        ...prevState,
        labelText: newStr
      }))
    }
  }

  changeLabel() {
    updateLabel(null, this.state.labelText)
    this.toggleLabel()
  }

  toggleClassLabel() {
    this.setState(prevState => ({
      ...prevState,
      classModalOpen: !prevState.classModalOpen
    }))
  }

  handleChangeClassLabel(event) {
    if (event && event.target && event.target.value) {
      var newStr = event.target.value;
      this.setState(prevState => ({
        ...prevState,
        classText: newStr
      }))
    }
  }

  changeClassLabel() {
    updateClassLabel(null, this.state.classText)
    this.toggleClassLabel()
  }

  displayEditAnnotationLabel () {
    return (
      <Modal isOpen={this.state.labelModalOpen} toggle={() => this.toggleLabel()} className="label-modal">
        <ModalBody>
          <input
            type="text"
            value={this.state.labelText}
            onChange={(e) => this.handleChangeLabel(e)}
          /> &nbsp;
          <Button onClick={() => this.changeLabel()}
          >
            {' '}
            Change Label{' '}
          </Button>
        </ModalBody>
      </Modal>
    )
  }

  displayEditAnnotationClass () {
    return (
      <Modal isOpen={this.state.classModalOpen} toggle={() => this.toggleClassLabel()} className="class-label-modal">
        <ModalBody>
          <input
            type="text"
            value={this.state.classText}
            onChange={(e) => this.handleChangeClassLabel(e)}
          /> &nbsp;
          <Button onClick={() => this.changeClassLabel()}
          >
            {' '}
            Change Class Label{' '}
          </Button>
        </ModalBody>
      </Modal>
    )

  }

  displayEditMenu() {
    return (
      <div>
        <Button
          color="primary"
          className="undo-btn"
          onClick={e => undo()}
        >
          Undo
        </Button>{' '}
        &nbsp;
        <Button
          color="primary"
          className="redo-btn"
          onClick={e => redo()}
        >
          Redo
        </Button>{' '}
        &nbsp;
        <Button
          color="primary"
          className="delete-btn"
          onClick={e => delAnnot()}
        >
          Delete
        </Button>{' '}
        &nbsp;
        <Button
          color="primary"
          className="edit-label-btn"
          onClick={e => this.toggleLabel()}
        >
          Edit Label
        </Button>{' '}
        &nbsp;
        <Button
          color="primary"
          className="edit-class-btn"
          onClick={e => this.toggleClassLabel()}
        >
          Edit Class
        </Button>{' '}
        &nbsp;
        {this.displayEditAnnotationLabel()}
        {this.displayEditAnnotationClass()}
      </div>
    );
  }

  render() {
    return (
      <div style={{ padding: '15px 7px' }}>
        <Navbar
          color="light"
          light
          className="navbar shadow-sm p-3 mb-0 bg-white rounded"
          expand="md"
        >
          {this.displayFileMenu()}
          {this.displayDrawMenu()}
          {this.displayEditMenu()}
        </Navbar>
      </div>
    );
  }
}

export default Menus;
