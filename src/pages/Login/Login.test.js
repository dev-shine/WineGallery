import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Login from './Login';

it('renders without crashing', () => {
  const div = document.createElement('div');

  // Wraps Login with BrowserRouter as it uses Link component inside
  ReactDOM.render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
