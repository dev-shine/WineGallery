import React, { Component } from 'react';

import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

import Routes from './routes';
import { Header } from './components';

import './styles/App.scss';

// Instantiate Apollo Client object for GraphQL
const client = new ApolloClient({
  uri: 'http://localhost/graphql',
  connectToDevTools: process.env.NODE_ENV === 'development',
});

/**
 * Renders our app entry point
 * */
class App extends Component {
  static propTypes = {};

  static defaultProps = {};

  componentDidMount() {}

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

            {/* Helps providing a fallback when loading lazily loaded components */}
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
