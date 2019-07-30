import React from 'react';
import { ApolloProvider } from 'react-apollo';
import apolloClient from '../../graphql/client';

import './App.scss';

import Post from '../Post';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <div className="app">
        <Post />
      </div>
    </ApolloProvider>
  );
}

export default App;
