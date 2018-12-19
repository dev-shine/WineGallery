import React from 'react';
import ReactDOM from 'react-dom';

import WineItems from './WineItems';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const item = {
    allWines: [{
      id: '1',
      product: {
        name: 'test product',
      },
      country: {
        name: 'test country',
      },
      wineType: {
        name: 'test type',
        wineClass: {
          name: 'test class',
        },
      },
    }],
  };
  ReactDOM.render(<WineItems data={item} name="Simple Item" />, div);
  ReactDOM.unmountComponentAtNode(div);
});
