import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import Quiz from './Quiz';

it('renders without crashing', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Quiz />);
});
