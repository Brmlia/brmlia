import React from "react";

import { buttonGroup } from '../style.js';
import {
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonGroup,
  Button,
  InputGroup,
  InputGroupAddon,
  Input,
} from 'reactstrap';

import {FileUpload} from "../../fileuploader/index.js";
import {exportJson} from '../../annotator/exporter.js'

class Menus extends React.Component {

  render() {

    return (
      <ButtonGroup size={buttonGroup.size} vertical={buttonGroup.vertical} style={buttonGroup} >
        <UncontrolledButtonDropdown>
          <DropdownToggle caret color="primary">
            File
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>
              <Button outline color="primary" className="export-btn" onClick={exportJson}> Export Annotations </Button>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledButtonDropdown>

        <UncontrolledButtonDropdown>
          <DropdownToggle caret color="primary">
            Draw
          </DropdownToggle>
          <DropdownMenu>
            <UncontrolledButtonDropdown>
              <DropdownToggle caret color="none">
                Rectangle
              </DropdownToggle>
              <DropdownMenu>
                <InputGroup>
                  <Input placeholder="username" />
                <InputGroupAddon addonType="append"><Button>Add a new annotation class (Rect)</Button></InputGroupAddon>
                </InputGroup>
                <Button outline color="primary"> Annotation Class 1 </Button>
                <Button outline color="primary"> Annotation Class 2 </Button>
                <Button outline color="primary"> Annotation Class 3 </Button>
                <Button outline color="primary"> Annotation Class 4 </Button>
              </DropdownMenu>
            </UncontrolledButtonDropdown>

            <UncontrolledButtonDropdown>
              <DropdownToggle caret color="none">
                Freehand
              </DropdownToggle>
              <DropdownMenu>
                <InputGroup>
                  <Input placeholder="username" />
                <InputGroupAddon addonType="append"><Button>Add a new annotation class(Free)</Button></InputGroupAddon>
                </InputGroup>
                <Button outline color="primary"> Annotation Class 1 </Button>
                <Button outline color="primary"> Annotation Class 2 </Button>
                <Button outline color="primary"> Annotation Class 3 </Button>
                <Button outline color="primary"> Annotation Class 4 </Button>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
          </DropdownMenu>
        </UncontrolledButtonDropdown>

        <UncontrolledButtonDropdown>
          <DropdownToggle caret color="primary">
            Edit
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem disabled> 1 </DropdownItem>
            <DropdownItem> 2 </DropdownItem>
          </DropdownMenu>
        </UncontrolledButtonDropdown>


        <Button outline color="primary" className="import-btn"> <FileUpload name="Import File" />  </Button>

      </ButtonGroup>
    );
  }
}

export default Menus;
