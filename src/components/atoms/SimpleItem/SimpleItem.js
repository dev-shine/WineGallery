import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './SimpleItem.scss';

class SimpleItem extends Component {
  static propTypes = {
    item: PropTypes.object,
    name: PropTypes.string
  };

  static contextTypes = {};

  componentDidMount() {
  }

  renderItemText = (index, property, item, propertiesLength) => {
    let result = '';

    if (index !== propertiesLength - 1) {
      result = <p key={property + item.id}>{property}: {item[property]}</p>;
    }

    return result;
  };

  render() {
    const { item, name } = this.props;
    const properties = item && Object.keys(item);

    return (
      <li key={name + item.id} className="SimpleItem">
        {properties.map((property, index) => this.renderItemText(index, property, item, properties.length))}
      </li>
    );
  }
}

export default SimpleItem;
