import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import AddWineToShoppingCartButton from './AddWineToShoppingCartButton';

it('renders without crashing', () => {
  const mockedWine = {
    wine: {
      product: {
        id: 100,
      },
    },
  };

  const renderer = new ShallowRenderer();
  renderer.render(<AddWineToShoppingCartButton wine={mockedWine} />);
});
