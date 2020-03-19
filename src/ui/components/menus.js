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

import {ImageUpload} from "../../fileuploader/index.js";

class AxesViewer extends React.Component {

  render() {
    return (
      <ButtonGroup size={buttonGroup.size} vertical={buttonGroup.vertical} style={buttonGroup} >
        <UncontrolledButtonDropdown>
          <DropdownToggle caret color="primary">
            File
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem> <ImageUpload/> </DropdownItem>
            <DropdownItem> Export </DropdownItem>
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
      </ButtonGroup>
    );
  }
}

export default AxesViewer;