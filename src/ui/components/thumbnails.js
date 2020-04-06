import React from 'react';

import { thumb, thumbInner } from '../style.js';
import { fApi } from '../../utils/index.js';

class Thumbnails extends React.Component {
  selected = 0;

  setSelected(idx) {
    if (this.selected !== idx) {
      fApi.setState(prevState => ({
        ...prevState,
        selected: idx,
      }));
      this.selected = idx;
    }
  }

  allThumbs = () => {
    var elements = [];

    if (fApi.getState().file) {
      fApi.getState().file.map((file, idx) => {
        if (file.type === 'image/png' || file.type === 'image/tiff') {
          elements.push(
            <div style={thumb} key={file.name}>
              <div style={thumbInner}>
                <img
                  src={file.image}
                  style={file.style}
                  alt={file.name}
                  onClick={() => this.setSelected(idx)}
                />
              </div>
            </div>
          );
        }
        return null;
      });
    }

    return <div>{elements}</div>;
  };

  render() {
    fApi.subscribe(state => {
      this.forceUpdate();
    });

    return <div id="thumbsContainer">{this.allThumbs()}</div>;
  }
}

export default Thumbnails;
