import React from 'react';
import PropTypes from 'prop-types';

import { formatNumber } from '../../../helpers/tools';

import './OrderSummary.scss';

/**
 * Renders OrderSummary component.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
const OrderSummary = props => {

  const { query } = props;
  const {
    shoppingcartitemSet,
    total,
    discountCode,
    discount,
  } = query.shoppingCart;

  return (
    <div className="OrderSummary">
      <div className="OrderSummary--container">
        <div className="OrderSummary--container__inner">
          <h2>Order Summary</h2>
          <ul>
            {shoppingcartitemSet.map(wine => (
              <li key={wine.product.id}>
                <span>
                  {
                    `${wine.product.name} |
                    $${formatNumber(wine.product.sellingPrice)} |
                    ${wine.quantity}`
                  }
                </span>
              </li>
            ))}
          </ul>
          {total && <div>{`Total: $${formatNumber(total)}`}</div>}
          {
            discount && (
              <div>
                <br />
                {discountCode && <div>{`Discount code: ${discountCode}`}</div>}
                {
                  discount && (
                    <div>
                      {`Discount applied: $${formatNumber(discount)}`}
                    </div>)
                }
                {`Final total: $${formatNumber(total - discount)}`}
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

OrderSummary.propTypes = {
  query: PropTypes.shape({
    id: PropTypes.string,
    shoppingCart: PropTypes.shape({
      discount: PropTypes.number,
      discountCode: PropTypes.string,
    }),
  }),
};

OrderSummary.defaultProps = {
  query: {},
};

export default OrderSummary;
