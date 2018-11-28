import React, { Component } from 'react';

import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

import './App.css';


const client = new ApolloClient({
    uri: 'http://localhost/graphql'
});

class App extends Component {
    state = {
        isLoading: false,
        error: null,
        wines: []
    };

    componentDidMount() {
        client
            .query({
                query: gql`
                {
                    allWines {
                        id
                        year
                        wineType {
                            id
                            name
                        }
                    }
                }`
            })
            .then(result =>
                this.setState({
                    ...result,
                    loading: result.loading,
                    wines: result.data.allWines
                })
            );
    }

    render() {
        const { loading, error, wines } = this.state;
        return (
            <div className="App">
                <header className="App-header">
                </header>
                <main>
                    whyNotWine? <br />
                    {loading && <div> Loading... </div>}
                    <ul>
                        {wines ?
                            wines.map(wine => {
                                return (
                                    <li key={wine.id + wine.wineType.name}>
                                        {wine.id} <br />
                                        {wine.year} <br />
                                        {wine.wineType.name} <br />
                                    </li>
                                )
                            }) :
                            <div>Sorry, your wine list is empty...</div>
                        }
                    </ul>
                </main>
                <footer>
                </footer>
            </div>
        );
    }
}

export default App;
