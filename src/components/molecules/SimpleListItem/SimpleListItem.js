import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { SimpleItem } from '../../';

import './SimpleListItem.scss';

class SimpleListItem extends Component {
  static propTypes = {
    data: PropTypes.object
  };

  static contextTypes = {};

  componentDidMount() {
  }

  render() {
    return (
      <div className="SimpleListItem">
        <ul>
          {this.props.data.allWines.map(wine => (
            // ATOM
            <SimpleItem key={'winesItems' + wine.id} name={'wines'} item={wine} />
          ))}
        </ul>
      </div>
    );
  }
}

export default SimpleListItem;
