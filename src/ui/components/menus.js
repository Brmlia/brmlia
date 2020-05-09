import React from 'react';

import { Alert, Button, Navbar, Modal, ModalBody } from 'reactstrap';

import { FileUpload } from '../../fileuploader/fileUploader.js';

import { exportJson, modes, setMode, undo, redo, delAnnot, updateLabel, updateClassLabel, updateImageProps } from './index.js';

class Menus extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      labelModalOpen: false,
      classModalOpen: false,
      imagePropModalOpen: false,
      labelText: '',
      classText: '',
      imPropZText: '',
      imPropChText: '',
      imPropOrder: '1',
      alert: false,
      alertType: 0,
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
    if (event && event.target && (event.target.value || (event.target.value === ''))) {
      var newStr = event.target.value;
      this.setState(prevState => ({
        ...prevState,
        labelText: newStr
      }))
    }
  }

  changeLabel() {
    updateLabel(null, this.state.labelText)
    this.setState(prevState => ({
      ...prevState,
      labelText: ''
    }))
    this.toggleLabel()
  }

  toggleClassLabel() {
    this.setState(prevState => ({
      ...prevState,
      classModalOpen: !prevState.classModalOpen
    }))
  }

  handleChangeClassLabel(event) {
    if (event && event.target && (event.target.value || (event.target.value === ''))) {
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
    this.setState(prevState => ({
      ...prevState,
      classText: ''
    }))
  }

  toggleImageProp() {
    this.setState(prevState => ({
      ...prevState,
      imagePropModalOpen: !prevState.imagePropModalOpen,
      alert: false,
    }))
  }

  handleChangeImagePropZ(event) {
    if (event && event.target && (event.target.value || (event.target.value === ''))) {
      var newStr = event.target.value;
      this.setState(prevState => ({
        ...prevState,
        imPropZText: newStr
      }))
    }
  }

  handleChangeImagePropCh(event) {
    if (event && event.target && (event.target.value || (event.target.value === ''))) {
      var newStr = event.target.value;
      this.setState(prevState => ({
        ...prevState,
        imPropChText: newStr
      }))
    }
  }

  changeImageProp() {
    const rc = updateImageProps(this.state.imPropOrder, parseInt(this.state.imPropChText), parseInt(this.state.imPropZText))
    if (rc === 0) {
      this.toggleImageProp()
      this.setState(prevState => ({
        ...prevState,
        imPropChText: '',
        imPropZText: '',
        alert: false,
      }))
    }
    else {
      this.setState(prevState => ({
        ...prevState,
        alert: true,
        alertType: rc,
      }))
    }
  }

  handleChangeImageOption(event) {
    if (event && event.target && (event.target.value || (event.target.value === ''))) {
      const value = event.target.value
        this.setState(prevState => ({
          ...prevState,
          imPropOrder: value
        }))
      }
  }

  displayAlert() {
    if (this.state.alertType === 1) {
      return (
        <Alert color="danger" isOpen={this.state.alert}>
          There are no images opened
        </Alert>
      )
    }
    else if (this.state.alertType === 2) {
      return (
        <Alert color="danger" isOpen={this.state.alert}>
          channels x slices != stack size
        </Alert>
      )
    }
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

  displayEditImageProperties () {
    return (
      <Modal isOpen={this.state.imagePropModalOpen} toggle={() => this.toggleImageProp()} className="edit-image-properties-modal">
        <ModalBody>
          {this.state.alert && this.displayAlert()}
          Order:
          <select
            name="im-prop-select-menu"
            value={this.state.imPropOrder}
            onChange={(e) => this.handleChangeImageOption(e)}
          >
            <option value="1"> xycz (default) </option>
            <option value="2"> xyzc </option>
          </select>
          <br />
          <br />
          <label for="im-prop-ch-text"> Channels (c): </label>
          <br />
          <input
            id="im-prop-ch-text"
            style={{boxSizing:"unset"}}
            type="text"
            value={this.state.imPropChText}
            onChange={(e) => this.handleChangeImagePropCh(e)}
          />
          <br/>
          <br/>
          <label for="im-prop-z-text"> Slices (z): </label>
          <br/>
          <input
            id="im-prop-z-text"
            style={{boxSizing:"unset"}}
            type="text"
            value={this.state.imPropZText}
            onChange={(e) => this.handleChangeImagePropZ(e)}
          />
          <br/>
          <br/>
          <Button onClick={() => this.changeImageProp()}
          >
            {' '}
            OK {' '}
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
        <Button
          color="primary"
          className="edit-image-properties-btn"
          onClick={e => this.toggleImageProp()}
        >
          Edit Image Properties
        </Button>{' '}
        &nbsp;
        {this.displayEditAnnotationLabel()}
        {this.displayEditAnnotationClass()}
        {this.displayEditImageProperties()}
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
