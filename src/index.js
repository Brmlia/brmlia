import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import React from 'react';
import ReactDOM from 'react-dom';
import UI from './ui';

function Application() {
  return (
    <div>
      <UI />
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Application />, rootElement);
