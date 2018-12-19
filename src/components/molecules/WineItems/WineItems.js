import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './WineItems.scss';

/**
 * Renders WineItems component.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class WineItems extends Component {
  static propTypes = {
    data: PropTypes.shape({ allWines: PropTypes.array }),
  };

  static defaultProps = {
    data: null,
  };

  renderWineItem = wine => (
    <div key={`winesItems${wine.id}`}>
      {wine.product.name}
      <br />
      {wine.wineType.wineClass.name}
      |
      {wine.wineType.name}
      <br />
      {wine.country.name}
      |
      {wine.year}
    </div>
  );

  render() {
    const { data } = this.props;
    return (
      <div className="WineItems">
        <div>
          {data.allWines.map(wine => (
            this.renderWineItem(wine)
          ))}
        </div>
      </div>
    );
  }
}

export default WineItems;
