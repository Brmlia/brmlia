import React from 'react';
import {
  Button,
  UncontrolledCollapse,
  Card,
  CardTitle,
  CardBody,
} from 'reactstrap';

import {
  annotApi,
  updateClasses,
  getClasses,
  toggleClassEnable,
  annotClassApi,
  filterClasses,
  annotCardStyle,
  annotViewStyle,
} from './index.js';

class AnnotatorViewer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      classes: [],
      annotClasses: [],
    };
    this.enables = [];
  }

  futureClass = [];
  futureAnnotClass = [];

  componentDidUpdate(prevState) {
    for (var i = 0; i < prevState.classes; i++) {
      const cls = prevState.classes[i];
      if (
        cls &&
        this.state.classes[i] !== cls.name &&
        this.enables[i] !== cls.enabled
      ) {
        return true;
      }
    }
    for (i = 0; i < prevState.annotClasses; i++) {
      const annotCls = prevState.annotClasses[i];
      if (annotCls && this.state.annotClasses[i] !== annotCls) {
        return true;
      }
    }
    return false;
  }

  filter(sel) {
    const classes = getClasses();
    toggleClassEnable(sel);
    filterClasses(classes[sel]);
  }

  updateAnnotClasses(annots) {
    for (var i = 0; i < annots.length; i++) {
      const cls = annots[i];
      if (
        !this.state.annotClasses.includes(cls.class) &&
        !this.futureAnnotClass.includes(cls.class)
      ) {
        this.futureAnnotClass.push(cls.class);
        this.setState(prevState => ({
          ...prevState,
          annotClasses: [...prevState.annotClasses, cls.class],
        }));
      }
    }
  }

  updateClasses(classes) {
    for (var i = 0; i < classes.length; i++) {
      const idx = i;
      const cls = classes[idx];
      if (
        !this.state.classes.includes(cls.name) &&
        !this.futureClass.includes(cls.name)
      ) {
        this.futureClass.push(cls.name);
        this.setState(prevState => ({
          ...prevState,
          classes: [...prevState.classes, cls.name],
        }));
      }
    }
  }

  updateEnables(classes) {
    for (var i = 0; i < classes.length; i++) {
      const idx = i;
      const cls = classes[idx];
      if (this.enables.length !== classes.length) {
        this.enables[i] = cls.enabled;
      } else if (cls && this.enables[i] !== cls.enabled) {
        this.enables[i] = cls.enabled;
        this.forceUpdate();
      }
    }
  }

  display() {
    return (
      <div>
        <div className="annotations-class" style={annotViewStyle}>
          <Card style={annotCardStyle}>
            <CardBody>
              <CardTitle>
                {' '}
                <h5> Annotation Classes </h5>{' '}
              </CardTitle>
            </CardBody>
            <Button
              className="viewBtn"
              outline
              color="secondary"
              id="annotator-class-list"
            >
              Class List
            </Button>
            <br />
            <UncontrolledCollapse toggler={'annotator-class-list'}>
              {this.displayClassList()}
            </UncontrolledCollapse>
          </Card>
        </div>
      </div>
    );
  }

  displayClassList() {
    const classes = getClasses();
    var divs = [];
    for (var i = 0; i < classes.length; i++) {
      const sel = i;
      const enabled = classes[sel].enabled;
      divs.push(
        <Button
          outline
          color="primary"
          id="annot1Btn"
          onClick={() => {
            this.filter(sel);
          }}
          active={enabled}
        >
          {classes[sel].name}
        </Button>
      );
    }
    return <div>{divs}</div>;
  }

  render() {
    annotApi.subscribe(state => {
      if (state) {
        updateClasses();
        this.updateAnnotClasses(state.annotations);
      }
    });
    annotClassApi.subscribe(state => {
      if (state && this.state.classes.length !== state.classes.length) {
        this.updateClasses(state.classes);
      }
      if (state && state.classes) {
        this.updateEnables(state.classes);
      }
    });
    return <div>{this.display()}</div>;
  }
}

export default AnnotatorViewer;
