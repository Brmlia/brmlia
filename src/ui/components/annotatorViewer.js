import React from 'react';
import { Button, Card, CardTitle, CardBody } from 'reactstrap';

import {
  annotApi,
  cardStyle,
  card,
  updateClasses,
  getClasses,
  toggleClassEnable,
  annotClassApi,
  filterClasses,
} from './index.js';

class AnnotatorViewer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      classes: [],
      annotClasses: [],
      enables: [],
    };
  }

  futureClass = [];
  futureAnnotClass = [];

  componentDidUpdate(prevState) {
    for (var i = 0; i < prevState.classes; i++) {
      const cls = prevState.classes[i];
      if (
        cls &&
        this.state.classes[i] !== cls.name &&
        this.state.enables[i] !== cls.enabled
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

      this.setState(prevState => {
        const enables = prevState.enables.map((en, j) => {
          if (j === idx) {
            return cls.enabled;
          } else {
            return en;
          }
        });
        return {
          enables,
        };
      });
    }
  }

  display() {
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
    return (
      <div>
        <div className="annotations-class" style={cardStyle}>
          <Card style={card}>
            <CardBody>
              <CardTitle> Annotated Class Selection </CardTitle>
            </CardBody>
            {divs}
          </Card>
        </div>

        <br></br>
      </div>
    );
  }

  render() {
    annotApi.subscribe(state => {
      if (state) {
        updateClasses();
        this.updateAnnotClasses(state.annotations);
      }
    });
    annotClassApi.subscribe(state => {
      if (state) {
        this.updateClasses(state.classes);
      }
    });
    return <div>{this.display()}</div>;
  }
}

export default AnnotatorViewer;
