import React, { Component } from 'react';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

import Routes from './routes';
import { Header } from './components';
import { getLocalStorageToken } from './helpers/auth';

import './styles/App.scss';

// Gets the authentication token from local storage if it exists
const token = getLocalStorageToken().accessToken;

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_ENDPOINT_GQL,
});

const cache = new InMemoryCache();

// Returns headers to the context so httpLink can read them
const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: token ? `Bearer ${token}` : '',
  },
}));

// Instantiates Apollo Client object for GraphQL
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  connectToDevTools: process.env.NODE_ENV === 'development',
  cache,
});

/**
 * Renders our app entry point
 * */
class App extends Component {
  static propTypes = {};

  static defaultProps = {};

  componentDidMount() {
  }

  render() {
    return (

      // Provides apollo client across the application
      <ApolloProvider client={client}>

        <div className="App">

          {/* Renders header in application */}
          <header className="App-header">
            <Header />
          </header>

          {/* Renders main area of the application */}
          <main className="App-body">

            {/* Provides a fallback when rendering lazily loaded components */}
            <React.Suspense fallback={<div>Loading...</div>}>

              {/* Renders the pages components using router */}
              <Routes />
            </React.Suspense>
          </main>

          <footer className="App-footer">
            This is a footer with no content yet.
          </footer>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
