import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';

import styled from 'styled-components';

import { HeaderUser } from '../..';
import urlPatterns from '../../../urls';

import alarmBell from '../../../assets/images/icons/alarm-bell.svg';
import { fonts } from '../../../styles/variables';
import breakpoints from '../../../styles/breakpoints';

const StyledHeaderLoggedIn = styled.div`
  ${breakpoints.mdUp} {
    order: 3;
    justify-content: flex-end;
  }
  margin-left: 20px;
  display: flex;
  align-items: center;
  ${breakpoints.mdDown} {
    margin-left: auto;
  }
`;

const StyledHeaderLogOutBtn = styled.a`
  text-transform: uppercase;
  flex-shrink: 0;
  background: none;
  border: none;
  padding: 0;
  font-family: ${fonts.fontInterstateUltraBlack};
  ${breakpoints.mdDown} {
    display: none;
  }
`;

const StyledHeaderNotificationBtn = styled.a`
  display: inline-block;
  width: 15px;
  margin-right: 20px;
  flex-shrink: 0;
`;

const StyledHeaderNotificationBtnImage = styled.img`
  display: block;
  width: 100%;
`;

class HeaderLoggedIn extends Component {

  static propTypes = {
    client: PropTypes.shape({}), // Apollo client coming form withApollo
    persistentCache: PropTypes.shape({}),
  };

  static defaultProps = {
    client: null,
    persistentCache: null,
  };

  handleLogout = event => {
    event.preventDefault();

    const { client, persistentCache } = this.props;

    // Logs user out from application once they land back in to Login page
    if (localStorage.getItem(process.env.REACT_APP_AUTH_LOCAL_STORAGE)) {
      window.location = `${process.env.REACT_APP_BASE_URL}${urlPatterns.HOME}`;

      // Removes all the state from session and local storage
      client.resetStore();
      persistentCache.purge();
      localStorage.removeItem(process.env.REACT_APP_AUTH_LOCAL_STORAGE);
      localStorage.removeItem(process.env.REACT_APP_STORE_LOCAL_STORAGE);
    }
  };

  render() {
    return (
      <StyledHeaderLoggedIn>
        <StyledHeaderNotificationBtn>
          <StyledHeaderNotificationBtnImage
            src={alarmBell}
            alt="alarm bell"
          />
        </StyledHeaderNotificationBtn>
        <HeaderUser />
        <StyledHeaderLogOutBtn onClick={e => this.handleLogout(e)}>Log out</StyledHeaderLogOutBtn>
      </StyledHeaderLoggedIn>
    );
  }
}

export default withApollo(HeaderLoggedIn);
