import React from 'react';

import { cardStyle, card } from '../style.js';
import './../styles.css';
import '../../utils/styles.css';
import ChannelViewer from './channelViewer.js';

import { Button, Card, CardTitle, CardBody } from 'reactstrap';

class AnnotatorViewer extends React.Component {
  state = {
    annotations: {
      annot1Sel: false,
      annot2Sel: false,
      annot3Sel: false,
      annot4Sel: false,
    },
  };

  updateSelection = sel => {
    switch (sel) {
      case 1:
        this.setState(prevState => ({
          annotations: {
            ...prevState.annotations,
            annot1Sel: !this.state.annotations.annot1Sel,
          },
        }));
        break;
      case 2:
        this.setState(prevState => ({
          annotations: {
            ...prevState.annotations,
            annot2Sel: !this.state.annotations.annot2Sel,
          },
        }));
        break;
      case 3:
        this.setState(prevState => ({
          annotations: {
            ...prevState.annotations,
            annot3Sel: !this.state.annotations.annot3Sel,
          },
        }));
        break;
      case 4:
        this.setState(prevState => ({
          annotations: {
            ...prevState.annotations,
            annot4Sel: !this.state.annotations.annot4Sel,
          },
        }));
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <div>
        <div className="annotations-class" style={cardStyle}>
          {console.log(
            'Annotations: ' +
              this.state.annotations.annot1Sel +
              ' ' +
              this.state.annotations.annot2Sel +
              ' ' +
              this.state.annotations.annot3Sel +
              ' ' +
              this.state.annotations.annot4Sel
          )}
          <Card style={card}>
            <CardBody>
              <CardTitle> Annotated Class Selection </CardTitle>
            </CardBody>
            <Button
              outline
              color="primary"
              id="annot1Btn"
              onClick={() => {
                this.updateSelection(1);
              }}
              active={this.state.annotations.annot1Sel}
            >
              Annotation Class 1
            </Button>
            <Button
              outline
              color="primary"
              id="annot1Btn"
              onClick={() => {
                this.updateSelection(2);
              }}
              active={this.state.annotations.annot2Sel}
            >
              Annotation Class 2
            </Button>
            <Button
              outline
              color="primary"
              id="annot1Btn"
              onClick={() => {
                this.updateSelection(3);
              }}
              active={this.state.annotations.annot3Sel}
            >
              Annotation Class 3
            </Button>
            <Button
              outline
              color="primary"
              id="annot1Btn"
              onClick={() => {
                this.updateSelection(4);
              }}
              active={this.state.annotations.annot4Sel}
            >
              Annotation Class 4
            </Button>
          </Card>
        </div>

        <br></br>
        <ChannelViewer />
      </div>
    );
  }
}

export default AnnotatorViewer;
