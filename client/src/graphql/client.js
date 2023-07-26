import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: /graphql,// 'http://localhost:3000/graphql', 
  cache: new InMemoryCache(),
});

export default client;
