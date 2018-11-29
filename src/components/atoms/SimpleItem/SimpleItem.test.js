import ReactDOM from 'react-dom';
import React from 'react';

import SimpleItem from './SimpleItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SimpleItem />, div);
  ReactDOM.unmountComponentAtNode(div);
});
