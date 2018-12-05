import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from './Header';

it('renders without crashing', () => {
  const div = document.createElement('div');

  // Wraps Header with BrowserRouter as it uses react-router-dom
  ReactDOM.render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
