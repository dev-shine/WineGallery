import gql from 'graphql-tag';
import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import ReactDOM from 'react-dom';

import WineItems from './WineItems';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const memberId = '1234';
  const item = [{
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
  }];
  const MEMBER_DUMMY_QUERY = gql`
    {
      me {
        id
      }
    }
  `;

  const mocks = [
    {
      request: {
        query: MEMBER_DUMMY_QUERY,
      },
      result: {
        data: {
          me: { id: '1234' },
        },
      },
    },
  ];

  ReactDOM.render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <WineItems data={item} memberId={memberId} name="Simple Item" />
    </MockedProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
