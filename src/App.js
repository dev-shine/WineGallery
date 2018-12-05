import React, { Component } from 'react';

import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

import Routes from './routes';
import { Header } from './components';

import './styles/App.scss';

const client = new ApolloClient({
  uri: 'http://localhost/graphql',
});

class App extends Component {
  static propTypes = {};

  componentDidMount() {}

  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <Header />
          </header>
          <main className="App-body">
            <React.Suspense fallback={<div>Loading...</div>}>
              <Routes />
            </React.Suspense>
          </main>
          <footer className="App-footer" />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
