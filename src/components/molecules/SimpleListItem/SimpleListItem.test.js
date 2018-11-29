import ReactDOM from 'react-dom';
import React from 'react';

import SimpleListItem from './SimpleListItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SimpleListItem />, div);
  ReactDOM.unmountComponentAtNode(div);
});
