import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import UI from './ui';

function Application() {
  return (
    <>
      <UI />
    </>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Application />, rootElement);
