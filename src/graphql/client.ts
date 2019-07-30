import ApolloBoost from 'apollo-boost';

const SERVER_URL = "http://localhost:3001/gq";

const client = new ApolloBoost({
  uri: SERVER_URL,
  onError: (err) => {
    const { networkError, graphQLErrors } = err;

    if (graphQLErrors) {
      graphQLErrors.map(({ message }) =>console.log(`[GraphQL error]: Message: ${message}`));
    }

    if (networkError) {console.log(`[Network error]: ${networkError}`);}
  }
});

export default client;
