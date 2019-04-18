import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import CreateWineList from './CreateWineList';

it('renders without crashing', () => {
  const mockedWine = {
    wine: {
      product: {
        id: 100,
      },
    },
  };

  const renderer = new ShallowRenderer();
  renderer.render(<CreateWineList wine={mockedWine} />);
});
