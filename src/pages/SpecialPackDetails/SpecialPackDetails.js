import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Mutation, Query } from 'react-apollo';

import { AddWineToShoppingCartButton } from '../../components';
import {
  GET_MEMBER,
  GET_SHOPPING_CART,
  GET_SPECIAL_PACK_DETAILS,
} from '../../graphql/queries';
import { ADD_SPECIAL_PACK_INTEREST } from '../../graphql/mutations';
import urlPatterns from '../../urls';
import { isLoggedIn } from '../../helpers/auth';

import './SpecialPackDetails.scss';

/**
 * Renders SpecialPackDetails component.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class SpecialPackDetails extends Component {
  static propTypes = {
    match: PropTypes.shape().isRequired,
    history: PropTypes.shape().isRequired,
  };

  static contextTypes = {};

  state = {
    boxQuantity: 1,
  };

  buySection = React.createRef();

  /**
   * Adds effect to scroll to the bottom of the page where the "buy" button is located
   * */
  handleScrollToBuySection = () => {
    window.scrollTo({ top: this.buySection.current.offsetTop, behavior: 'smooth' });
  };

  /**
   * Sends request to GraphQL to register interest from the user in the special pack
   * If user is not logged in, it will be redirected to the login page
   * @param {Object} specialPack
   * @param {Function} registerInterestMutation
   * @return {Promise<void>}
   * */
  handleAddSpecialPackInterest = async (specialPack, registerInterestMutation) => {
    const { history } = this.props;

    if (isLoggedIn()) {
      const memberId = parseInt(window.localStorage.getItem('memberId'), 10);
      await registerInterestMutation({
        variables: {
          input: {
            specialPackEditionId: specialPack.id,
            memberId,
          },
        },
      });
    } else {
      history.push(urlPatterns.LOGIN);
    }

  };

  /**
   * Sets quantity of special boxes the user wants to purchase
   * @param {Event} e
   * */
  handleQuantityChange = e => {
    const quantity = parseInt(e.target.value, 10);
    this.setState({ boxQuantity: quantity });
  };

  /**
   * Renders options for select input field from the quantity user wants to purchase.
   * */
  renderOptions = () => {
    const options = [];
    for (let index = 1; index < 25; index++) {
      options.push(
        <option value={index} key={index}>
          {`${index} ${index === 1 ? ' box' : ' boxes'}`}
        </option>
      );
    }
    return options;
  };

  render() {
    const { boxQuantity } = this.state;
    const { match } = this.props;
    const { slug } = match.params;

    return (
      <div className="SpecialPackDetails">
        <Query query={GET_SPECIAL_PACK_DETAILS} variables={{ slug }}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) console.error(`Shopping cart error! ${error.message}`);

            const specialPack = data && data.specialPackEdition;
            if (!specialPack) return 'Sorry this pack is not available anymore...';

            return (
              <div className="SpecialPackDetails--container">
                <div className="SpecialPackDetails--container__inner">

                  {/* HERO BANNER */}
                  <section className={`SpecialPackDetails--hero-banner ${specialPack.heroTopTheme}`}>
                    <img
                      className="SpecialPackDetails--hero-banner__image"
                      src={specialPack.heroTopImageLargeUrl}
                      alt={specialPack.section1Title}
                    />
                    <div className="SpecialPackDetails--hero-banner__title">
                      <h1>{specialPack.seoTitle}</h1>
                      <p>
                        {specialPack.seoDescription}
                      </p>
                      <button type="button" onClick={this.handleScrollToBuySection}>
                        {specialPack.isAvailable ? 'Order now' : 'Register your interest'}
                      </button>
                    </div>
                  </section>

                  {/* SECTION 1 */}
                  <section className="SpecialPackDetails--content">
                    <div className="SpecialPackDetails--content__title">
                      <h2>{specialPack.section1Title}</h2>
                      <p>{specialPack.section1Text}</p>
                    </div>
                    <div className="SpecialPackDetails--content__image">
                      <img
                        className="SpecialPackDetails--content__image"
                        src={specialPack.section1ImageLargeUrl}
                        alt={specialPack.section1Title}
                      />
                    </div>
                  </section>

                  {/* SECTION 2 */}
                  <section className="SpecialPackDetails--content">
                    <div className="SpecialPackDetails--content__title">
                      <h2>{specialPack.section2Title}</h2>
                      <p>{specialPack.section2Text}</p>
                    </div>
                    <div className="SpecialPackDetails--content__image">
                      <img
                        className="SpecialPackDetails--content__image"
                        src={specialPack.section2ImageLargeUrl}
                        alt={specialPack.section2Title}
                      />
                    </div>
                  </section>

                  {/* SECTION 3 */}
                  <section className="SpecialPackDetails--content">
                    <div className="SpecialPackDetails--content__title">
                      <h2>{specialPack.section3Title}</h2>
                      <p>{specialPack.section3Text}</p>
                    </div>
                    <div className="SpecialPackDetails--content__image">
                      <img
                        src={specialPack.section3ImageLargeUrl}
                        alt={specialPack.section3Title}
                      />
                    </div>
                  </section>

                  {/* SECTION BOTTOM */}
                  <section className="SpecialPackDetails--content bottom" ref={this.buySection}>
                    <div className="SpecialPackDetails--content__title">
                      <h2>{specialPack.heroBottomTitle}</h2>
                      <p>{specialPack.heroBottomSubTitle}</p>
                      {
                        specialPack.isAvailable && (
                          <div>
                            <select
                              name="select-boxes"
                              id="select-boxes"
                              onChange={e => this.handleQuantityChange(e)}
                            >
                              {this.renderOptions()}
                            </select>
                          </div>
                        )
                      }
                      {

                        // Renders button to add special pack to shopping cart or to register interest
                        specialPack.isAvailable
                          ? (
                            <AddWineToShoppingCartButton
                              wine={specialPack}
                              quantity={boxQuantity}
                              label="Order Now"
                            />
                          )
                          : (
                            <Mutation
                              mutation={ADD_SPECIAL_PACK_INTEREST}
                              refetchQueries={() => [{ query: GET_MEMBER }, { query: GET_SHOPPING_CART }]}
                            >
                              {registerInterestMutation => (
                                <button
                                  type="button"
                                  onClick={() => this.handleAddSpecialPackInterest(
                                    specialPack, registerInterestMutation
                                  )}
                                >
                                  Register Interest
                                </button>
                              )}
                            </Mutation>
                          )
                      }
                    </div>
                    <div className="SpecialPackDetails--content__image">
                      <img
                        src={specialPack.heroBottomImageLargeUrl}
                        alt={specialPack.heroBottomSubTitle}
                      />
                    </div>
                  </section>
                </div>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default SpecialPackDetails;
