import { ApolloClient, InMemoryCache, HttpLink, split, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = new createHttpLink({
  uri: `${process.env.REACT_APP_APOLLO_ADDRESS}:${process.env.REACT_APP_APOLLO_PORT}${process.env.REACT_APP_APOLLO_ENDPOINT}`,
  credentials: "same-origin"
});

const authLink = setContext((_, { headers }) => {
  
  const token = localStorage.getItem("access_token");

  return {
    headers: {
      ...headers,
      authorization: token ? token : ""
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  fetchOptions: {
    mode: "cors"
  }
});

export default client;